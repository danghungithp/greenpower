import React from 'react';

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
        Quản lý Sản phẩm
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Thêm, chỉnh sửa và quản lý danh mục sản phẩm của bạn.
      </p>
      {/* Placeholder for product management UI */}
      <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">Giao diện quản lý sản phẩm sẽ ở đây.</p>
      </div>
    </div>
  );
}
