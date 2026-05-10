import { Card, CardHeader } from '@/components/ui/card';
import React from 'react';

const MealCard: React.FC = () => {
  return (
    <Card className="h-40 bg-gray-100">
      <CardHeader className="flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-3xl font-semibold">
          <span>Chicken breast</span>
          <span>300g</span>
          <span>content</span>
          <span>b: 20 f: 5 c: 10 kcal: 430</span>
        </div>
      </CardHeader>
    </Card>
  );
};

export default MealCard;
