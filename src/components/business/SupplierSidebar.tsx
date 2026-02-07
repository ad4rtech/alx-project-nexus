import React from 'react';
import { Building2, CheckCircle, Mail, Phone} from 'lucide-react';

export const SupplierSidebar = () => {
    return (
        <div className="bg-white rounded-lg border border-gray-100 p-6 space-y-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Supplier Details
            </h3>

            {/* Supplier Profile Header */}
            <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 bg-gray-50 rounded-md border border-gray-100 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                    <h4 className="text-base font-bold text-gray-900">TechSource Solutions</h4>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 uppercase tracking-wide border border-green-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified Supplier
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Member since 2026</p>
                </div>
            </div>

            <div className="border-t border-gray-100 my-4"></div>

            {/* Contact Info */}
            <div className="space-y-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Information</p>
                <div className="bg-gray-50 px-3 py-2 rounded-md flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>sales@techsourcesolutions.com</span>
                </div>
                <div className="bg-gray-50 px-3 py-2 rounded-md flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>+254722004455</span>
                </div>
            </div>


        </div>
    );
};
