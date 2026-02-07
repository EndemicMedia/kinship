import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const localesDir = path.join(rootDir, 'locales');
const enJsonPath = path.join(localesDir, 'en.json');

// Directories to scan
const scanDirs = [
    'pages',
    'components',
    'layouts',
    'composables',
    'utils',
    // Add other directories if needed
];

// Regex to find translation keys
// Matches:
// $t('key')
// t('key')
// v-t="'key'"
// i18n.t('key')
// label="key" (sometimes used in props, but risky to match all strings. Stick to explicit translation calls for now)
//
// Refined Regex:
// 1. Function calls:  (t|$t)\s*\(\s*(['"`])(.*?)\2
// 2. v-t directive:   v-t\s*=\s*(['"])\1?(.*?)\1?
//
// Note: This is a simple regex and might miss complex cases or false positives.
const patterns = [
    /(?:^|[^\w])(?:t|\$t)\s*\(\s*(['"`])([\w.\-]+)\1/g,
    /v-t\s*=\s*(?:['"])\s*(?:['"`])([\w.\-]+)(?:['"`])\s*(?:['"])/g // matches v-t="'key'"
];

function flattenKeys(obj, prefix = '') {
    let keys = [];
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            keys = keys.concat(flattenKeys(obj[key], prefix + key + '.'));
        } else {
            keys.push(prefix + key);
        }
    }
    return keys;
}

function loadExistingKeys() {
    if (!fs.existsSync(enJsonPath)) {
        console.error(`Could not find ${enJsonPath}`);
        process.exit(1);
    }
    const content = fs.readFileSync(enJsonPath, 'utf-8');
    try {
        const json = JSON.parse(content);
        return new Set(flattenKeys(json));
    } catch (e) {
        console.error(`Error parsing ${enJsonPath}:`, e);
        process.exit(1);
    }
}

function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const foundKeys = new Set();

    for (const pattern of patterns) {
        let match;
        // Reset regex index for each file? No, matchAll or loop loop.
        // patterns are global, so we can loop exec.
        // Create new regex object or reset lastIndex if reusing global regex?
        // Better to just create new Regex or use matchAll if available (Node 12+)

        // safe way:
        const regex = new RegExp(pattern);
        // Wait, patterns need to be global for exec loop.

        // Let's use string.matchAll
    }

    // Simplified loop
    patterns.forEach(regex => {
        // Determine which group captures the key. Usually group 2 in my patterns above.
        // Pattern 1: group 2 is key.
        // Pattern 2: group 1 is key (if simplified).

        // Let's uniform the regex to always have key in specific group or iterate matches.

        // Re-defining regexes to be simpler for matchAll

        // 1. Function calls: t('key') or $t('key')
        // Matches "t('key')" -> group 2 is 'key'
        const funcMatches = content.matchAll(/(?:^|[^\w])(?:t|\$t)\s*\(\s*(['"`])([\w.\-]+)\1/g);
        for (const m of funcMatches) {
            foundKeys.add(m[2]);
        }

        // 2. v-t="'key'"
        // Matches v-t="'key'" -> group 1 is key
        const vtMatches = content.matchAll(/v-t\s*=\s*['"]['"`]([\w.\-]+)['"`]['"]/g);
        for (const m of vtMatches) {
            foundKeys.add(m[1]);
        }
    });

    return foundKeys;
}

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) {
            walkDir(filepath, callback);
        } else if (stats.isFile() && /\.(vue|js|ts)$/.test(file)) {
            callback(filepath);
        }
    }
}

async function main() {
    console.log('Loading existing translation keys...');
    const existingKeys = loadExistingKeys();
    console.log(`Found ${existingKeys.size} existing keys.`);

    const usedKeys = new Set();
    const fileMap = new Map(); // key -> list of files

    console.log('Scanning codebase...');
    for (const dir of scanDirs) {
        walkDir(path.join(rootDir, dir), (filepath) => {
            const keys = scanFile(filepath);
            for (const key of keys) {
                usedKeys.add(key);
                if (!fileMap.has(key)) fileMap.set(key, []);
                fileMap.get(key).push(path.relative(rootDir, filepath));
            }
        });
    }

    console.log(`Found ${usedKeys.size} unique keys in common code directories.`);

    const missingKeys = [];
    for (const key of usedKeys) {
        if (!existingKeys.has(key)) {
            missingKeys.push(key);
        }
    }

    if (missingKeys.length > 0) {
        console.log('\n❌ Missing Translations:');
        missingKeys.sort().forEach(key => {
            console.log(`\nKey: ${key}`);
            console.log(`Found in:`);
            fileMap.get(key).forEach(f => console.log(` - ${f}`));
        });
        console.log(`\nTotal missing keys: ${missingKeys.length}`);
        process.exit(1);
    } else {
        console.log('\n✅ All keys used in code exist in en.json.');
    }
}

main();
