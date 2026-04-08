import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="dashboard-grid bg-slate-900 text-slate-100 min-h-screen animate-fade-in relative overflow-hidden">
      <!-- Background Ambient Glow -->
      <div class="fixed top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none"></div>
      
      <!-- Sidebar container -->
      <div class="sidebar-container z-20 relative border-r border-white/5 backdrop-blur-xl bg-slate-900/50">
        <app-sidebar></app-sidebar>
      </div>

      <!-- Main Content Area -->
      <main class="flex flex-col flex-1 h-screen overflow-y-auto relative z-10 custom-scrollbar">
        <!-- Topbar Mobile (Visible only on small screens) -->
        <header class="md:hidden glass-panel h-16 flex items-center px-4 justify-between sticky top-0 rounded-b-xl z-30 m-2">
          <h1 class="text-white font-bold">Book CRM</h1>
          <button class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        <!-- Dynamic router content with padding -->
        <div class="p-6 md:p-8 relative min-h-0 h-full">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class MainLayoutComponent {}
