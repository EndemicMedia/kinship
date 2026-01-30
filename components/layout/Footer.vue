<template>
  <footer class="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
    <UContainer>
      <div class="grid gap-8 md:grid-cols-4">
        <!-- Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="Kinship" class="h-10 w-10" />
            <span class="text-xl font-semibold text-slate-900 dark:text-white">Kinship</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Form parenting crews with intention, clarity, and lasting support.
          </p>
        </div>

        <!-- Product -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Product</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="#features" class="hover:text-slate-900 dark:hover:text-white">Features</a></li>
            <li><a href="#how-it-works" class="hover:text-slate-900 dark:hover:text-white">How it works</a></li>
            <li><a href="#pricing" class="hover:text-slate-900 dark:hover:text-white">Pricing</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Company</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="#about" class="hover:text-slate-900 dark:hover:text-white">About</a></li>
            <li><a href="#blog" class="hover:text-slate-900 dark:hover:text-white">Blog</a></li>
            <li><a href="#contact" class="hover:text-slate-900 dark:hover:text-white">Contact</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Legal</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="#privacy" class="hover:text-slate-900 dark:hover:text-white">Privacy</a></li>
            <li><a href="#terms" class="hover:text-slate-900 dark:hover:text-white">Terms</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
        <p>&copy; {{ new Date().getFullYear() }} Kinship. All rights reserved.</p>
      </div>
    </UContainer>
  </footer>
</template>
