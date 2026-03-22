import { Zap } from "lucide-react";

export default function RightPanel() {
  return (
    <div className="space-y-4">

      {/* PIPELINE */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Pipeline Velocity
        </h2>

        <div className="space-y-3 text-sm">

          <div>
            <div className="flex justify-between">
              <span>Discovery</span>
              <span>85%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="w-[85%] h-full bg-blue-500 rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>Negotiation</span>
              <span>42%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="w-[42%] h-full bg-purple-400 rounded-full"></div>
            </div>
          </div>

        </div>
      </div>

      {/* ACTION BOX */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">

        <div className="w-10 h-10 mx-auto bg-blue-50 rounded-lg flex items-center justify-center mb-3">
          <Zap className="w-5 h-5 text-blue-500" />
        </div>

        <h3 className="text-sm font-semibold text-gray-900">
          Auto-Match Leads
        </h3>

        <p className="text-xs text-gray-400 mt-1 mb-3">
          Let our AI engine match leads to your profile
        </p>

        <button className="w-full py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600">
          Execute matching
        </button>
      </div>

    </div>
  );
}