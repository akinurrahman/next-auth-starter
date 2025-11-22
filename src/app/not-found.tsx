'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft, Home } from 'lucide-react';

import FloatingParticles from '@/components/visuals/floating-particles';

export default function Custom404Page() {
  const router = useRouter();
  return (
    <div className="from-background via-surface to-secondary relative min-h-screen overflow-hidden bg-linear-to-br">
      <FloatingParticles />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* 404 Text with gradient */}
        <div className="relative mb-8">
          <h1 className="text-gradient-primary glow text-[12rem] leading-none font-black select-none md:text-[16rem]">
            404
          </h1>

          {/* Glowing effects behind text */}
          <div
            className="bg-gradient-primary absolute inset-0 -z-10 opacity-30 blur-3xl"
            style={{ transform: 'scale(0.8)' }}
          />
        </div>

        {/* Message card with glass morphism */}
        <div className="relative w-full max-w-2xl">
          <div className="frosted glow-lg hover-lift rounded-3xl px-8 md:px-12">
            <h2 className="text-foreground mb-4 text-center text-3xl font-bold md:text-4xl">
              Oops! Page Not Found
            </h2>

            <p className="text-muted-foreground mb-8 text-center text-lg">
              The page you&apos;re looking for seems to have wandered off into the digital void.
              Let&apos;s get you back on track.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => router.push('/')}
                className="group bg-gradient-primary hover-scale glow cursor-pointer rounded-xl px-8 py-4 font-semibold transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <Home className="h-5 w-5" />
                  Go Home
                </span>
              </button>

              <button
                onClick={() => router.back()}
                className="group border-secondary bg-primary/5 hover-scale cursor-pointer rounded-xl border-2 px-8 py-4 font-semibold backdrop-blur-sm transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  Go Back
                </span>
              </button>
            </div>
          </div>

          {/* Decorative glow effect */}
          <div className="bg-gradient-mesh absolute -inset-4 -z-10 rounded-3xl opacity-20 blur-2xl" />
        </div>
      </div>
    </div>
  );
}
