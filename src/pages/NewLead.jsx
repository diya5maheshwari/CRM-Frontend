import { useState } from "react";
import { validateGST } from "../utils/validateGST";
import { createLead } from "../services/api";

export default function NewLead() {
  const [isCreateLead, setIsCreateLead] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    gstNo: "",
    status: "ACTIVE",
    contactPerson: "",
    designation: "",
    contactPhone: "",
    contactEmail: "",
    address: "",
    goodsDescription: "",
    leadTitle: "",
    leadStatus: "New",
    followUpDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    // REQUIRED FIELDS
    if (!form.companyName) err.companyName = "Company name required";

    if (!validateGST(form.gstNo)) err.gstNo = "Invalid GST";

    if (!form.contactPhone) {
      err.contactPhone = "Phone required";
    } else if (!/^[6-9]\d{9}$/.test(form.contactPhone)) {
      err.contactPhone = "Invalid phone";
    }

    if (!form.contactEmail) {
      err.contactEmail = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(form.contactEmail)) {
      err.contactEmail = "Invalid email";
    }

    if (!form.address) err.address = "Address required";

    if (!form.goodsDescription) err.goodsDescription = "Description required";
    // CONDITIONAL VALIDATION
    if (isCreateLead) {
      if (!form.leadTitle) err.leadTitle = "Lead title required";
      if (!form.followUpDate) err.followUpDate = "Follow-up date required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      // 🔹 BASE PAYLOAD (always send)
      let payload = {
        companyName: form.companyName,
        gstNo: form.gstNo,
        contactPerson: form.contactPerson,
        designation: form.designation,
        contactPhone: form.contactPhone,
        contactEmail: form.contactEmail,
        address: form.address,
        goodsDescription: form.goodsDescription,
        status: "ACTIVE",
        callDuration: 0,
      };

      //  CONDITION: ONLY IF CHECKBOX SELECTED
      if (isCreateLead) {
        payload = {
          ...payload,
          leadTitle: form.leadTitle,
          leadStatus: form.leadStatus,
          nextFollowUpDate: form.followUpDate,
        };
      }

      console.log("FINAL PAYLOAD:", payload);

      await createLead(payload);

      alert("Saved Successfully ");
      setForm({
        companyName: "",
        gstNo: "",
        status: "ACTIVE",
        contactPerson: "",
        designation: "",
        contactPhone: "",
        contactEmail: "",
        address: "",
        goodsDescription: "",
        leadTitle: "",
        leadStatus: "New",
        followUpDate: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed ❌");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mb-6">
          Add New Company
        </h2>

        {/* COMPANY INFO */}
        <h3 className="text-sm font-semibold text-gray-600 mb-4 border-b pb-2">
          Company Information
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* COMPANY NAME */}
          <div>
            <label className="text-sm font-medium">Company Name *</label>
            <input
              name="companyName"
               value={form.companyName}
              placeholder="Enter full company name"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
            <p className="text-red-500 text-xs">{errors.companyName}</p>
          </div>

          {/* GST + STATUS */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">GST Number</label>
              <input
                name="gstNo"
                value={form.gstNo}
                placeholder="22AAAAA0000A1Z5"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
              <p className="text-red-500 text-xs">{errors.gstNo}</p>
            </div>

            <div>
              <label className="text-sm">Status</label>
              <select
                name="status"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* CONTACT */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Contact Person *</label>
              <input
                name="contactPerson"
                value={form.contactPerson}
                placeholder="Full name"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm">Designation</label>
              <input
                name="designation"
                value={form.designation}
                placeholder="e.g. Manager"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>
          </div>

          {/* PHONE + EMAIL */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Contact Phone *</label>
              <input
                name="contactPhone"
                value={form.contactPhone}
                placeholder="10-digit number"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
              <p className="text-red-500 text-xs">{errors.contactPhone}</p>
            </div>

            <div>
              <label className="text-sm">Contact Email</label>
              <input
                name="contactEmail"
                value={form.contactEmail}
                placeholder="email@example.com"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
              <p className="text-red-500 text-xs">{errors.contactEmail}</p>
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-sm">Address *</label>
            <textarea
              name="address"
              value={form.address}
              placeholder="Street, City, State, PIN"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm">Goods / Services Description *</label>
            <textarea
              name="goodsDescription"
              value={form.goodsDescription}
              placeholder="Describe company services..."
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
            <p className="text-red-500 text-xs">{errors.goodsDescription}</p>
          </div>

          {/* CHECKBOX */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-2">
              Create First Lead (Optional)
            </h3>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                onChange={() => setIsCreateLead(!isCreateLead)}
              />
              Create the first lead for this company now
            </label>
          </div>

          {/* CONDITIONAL FIELDS */}
          {isCreateLead && (
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="text-sm">Lead Title</label>
                <input
                  name="leadTitle"
                  value={form.leadTitle}
                  placeholder="Initial Inquiry"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm">Lead Status</label>
                <select
                  name="leadStatus"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                >
                  <option>New</option>
                  <option>Prospective</option>
                  <option>Materialized</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Next Follow-up Date</label>
                <input
                  type="date"
                  value={form.followUpDate}
                  name="followUpDate"
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
            </div>
          )}

          {/* BUTTON */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4">
            Save Company
          </button>
        </form>
      </div>
    </div>
  );
}
