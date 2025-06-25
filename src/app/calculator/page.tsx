import React from 'react';

export default function CalculatorPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
        Công cụ tính toán
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Các công cụ để tính toán mức tiêu thụ, giờ nắng và công suất hệ thống.
      </p>
       {/* Placeholder for calculator tools UI */}
      <div className="mt-8 flex h-96 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">Các công cụ tính toán sẽ ở đây.</p>
      </div>
    </div>
  );
}
