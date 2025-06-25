import React from 'react';

export default function MenuPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
        Trình tạo Menu
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Sắp xếp menu điều hướng trang web của bạn.
      </p>
      {/* Placeholder for menu builder UI */}
      <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">Trình tạo menu kéo và thả sẽ ở đây.</p>
      </div>
    </div>
  );
}
