import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Cpu, HardDrive, Monitor, Wifi, Settings, Battery, MousePointer2 } from 'lucide-react';

interface ITAdminProductCardProps {
    id: string | number;
    category: string;
    title: string;
    features?: string[];
    warranty?: string;
    image?: string;
}

// Helper to guess icon based on feature text
const getFeatureIcon = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('intel') || t.includes('chip') || t.includes('core')) return <Cpu className="w-3.5 h-3.5 text-blue-500" />;
    if (t.includes('ssd') || t.includes('storage') || t.includes('ram') || t.includes('memory')) return <HardDrive className="w-3.5 h-3.5 text-blue-500" />;
    if (t.includes('display') || t.includes('lcd') || t.includes('oled') || t.includes('nits')) return <Monitor className="w-3.5 h-3.5 text-blue-500" />;
    if (t.includes('battery')) return <Battery className="w-3.5 h-3.5 text-blue-500" />;
    if (t.includes('fi') || t.includes('bluetooth') || t.includes('wan')) return <Wifi className="w-3.5 h-3.5 text-blue-500" />;
    if (t.includes('dpi') || t.includes('sensor')) return <MousePointer2 className="w-3.5 h-3.5 text-blue-500" />;
    return <Settings className="w-3.5 h-3.5 text-blue-500" />;
};

const getWarrantyColor = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('premier') || t.includes('adv')) return 'bg-green-500 text-white border-green-500'; // Dell/Lenovo Premier
    if (t.includes('applecare')) return 'bg-green-600 text-white border-green-600'; // Apple
    if (t.includes('lifetime')) return 'bg-emerald-600 text-white border-emerald-600'; // Cisco
    return 'bg-green-500 text-white border-green-500'; // Default Green
};

export const ITAdminProductCard = ({ category, title, features = [], warranty = '1 Yr Standard', image }: ITAdminProductCardProps) => {
    return (
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            {/* Image Area - Taller Aspect Ratio */}
            <div className="aspect-4/5 w-full bg-gray-50 relative border-b border-gray-50 overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-contain p-8"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-x-8 inset-y-8 flex items-center justify-center">
                        <div className="w-full h-full bg-gray-200 rounded opacity-20 transform scale-90"></div>
                    </div>
                )}
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            <div className="p-6 flex flex-col grow">
                {/* Category */}
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                    {title}
                </h3>

                {/* Feature List */}
                <div className="space-y-3 mb-8 grow">
                    {features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="mt-0.5 shrink-0">
                                {getFeatureIcon(feature)}
                            </div>
                            <span className="text-xs text-gray-500 font-medium leading-tight">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className={`inline-flex items-center px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${getWarrantyColor(warranty)}`}>
                        <ShieldCheck className="w-3 h-3 mr-1.5" />
                        {warranty}
                    </div>
                </div>
            </div>
        </div>
    );
};
