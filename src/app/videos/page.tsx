import React from 'react';

export default function VideosPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
        Quản lý Videos
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Sắp xếp và quản lý nội dung video của bạn.
      </p>
       {/* Placeholder for video management UI */}
      <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">Giao diện quản lý video sẽ ở đây.</p>
      </div>
    </div>
  );
}
