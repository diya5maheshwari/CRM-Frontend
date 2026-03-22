import { Phone, Mail, FileText } from "lucide-react";

export default function Activity() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">

      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {/* CALL */}
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Phone className="w-4 h-4 text-blue-500" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">
              Call Completed with Acme Corp
            </p>
            <p className="text-xs text-gray-400">
              Discussed Q3 expansion strategy
            </p>
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-purple-500" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">
              Lead Captured: Sarah Jenkins
            </p>
            <p className="text-xs text-gray-400">
              LinkedIn inbound lead
            </p>
          </div>
        </div>

        {/* FILE */}
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-gray-600" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">
              Deal Materialized: Global Tech Ltd
            </p>
            <p className="text-xs text-gray-400">
              Contract signed successfully
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}