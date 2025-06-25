import React from 'react';

export default function PostsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
        Quản lý Bài viết
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Tạo, chỉnh sửa và quản lý các bài viết của bạn tại đây.
      </p>
      {/* Placeholder for post management UI */}
      <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">Giao diện quản lý bài viết sẽ ở đây.</p>
      </div>
    </div>
  );
}
