import React from 'react';

export default function MenuPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
        Menu Builder
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Organize your website's navigation menu.
      </p>
      {/* Placeholder for menu builder UI */}
      <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">Drag-and-drop menu builder will be here.</p>
      </div>
    </div>
  );
}
