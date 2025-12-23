import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from 'lucide-react'; // Wait, usage of Badge? I didn't install badge from shadcn. I'll use standard elements or install badge if needed. Actually I didn't install badge. I'll stick to div/span.

import { ReportBlueprint } from '@/lib/data';

interface ReportViewProps {
    data: ReportBlueprint;
}

const ReportView: React.FC<ReportViewProps> = ({ data }) => {
    return (
        <Card className="w-full mt-6 shadow-lg border-t-4 border-t-blue-600">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded">Topic Blueprint</span>
                </div>
                <CardTitle className="text-2xl font-bold">{data.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Summary</h3>
                    <p className="text-gray-700 leading-relaxed">{data.summary}</p>
                </div>

                <Separator />

                <div>
                    <h3 className="font-semibold text-lg mb-2">Action Items (Inquiry Steps)</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {data.actionItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <Separator />

                <div>
                    <h3 className="font-semibold text-lg mb-2">Key References</h3>
                    <ul className="list-none space-y-2 text-sm text-gray-600">
                        {data.references.map((ref, index) => (
                            <li key={index} className="p-2 bg-gray-50 rounded italic border-l-2 border-gray-300">
                                "{ref}"
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportView;
