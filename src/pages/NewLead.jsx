import { useState } from "react";
import { validateGST } from "../utils/validateGST";

export default function NewLead() {
  const [createLead, setCreateLead] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    gst: "",
    status: "Active",
    contactPerson: "",
    designation: "",
    phone: "",
    email: "",
    address: "",
    description: "",
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

    if (!form.companyName) err.companyName = "Required";
    if (!validateGST(form.gst)) err.gst = "Invalid GST";
    if (!/^[6-9]\d{9}$/.test(form.phone)) err.phone = "Invalid phone";
    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Invalid email";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(form);
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
            <label className="text-sm font-medium">
              Company Name *
            </label>
            <input
              name="companyName"
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
                name="gst"
                placeholder="22AAAAA0000A1Z5"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
              <p className="text-red-500 text-xs">{errors.gst}</p>
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
                placeholder="Full name"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm">Designation</label>
              <input
                name="designation"
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
                name="phone"
                placeholder="10-digit number"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
              <p className="text-red-500 text-xs">{errors.phone}</p>
            </div>

            <div>
              <label className="text-sm">Contact Email</label>
              <input
                name="email"
                placeholder="email@example.com"
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mt-1"
              />
              <p className="text-red-500 text-xs">{errors.email}</p>
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-sm">Address *</label>
            <textarea
              name="address"
              placeholder="Street, City, State, PIN"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm">
              Goods / Services Description *
            </label>
            <textarea
              name="description"
              placeholder="Describe company services..."
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          {/* CHECKBOX */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-2">
              Create First Lead (Optional)
            </h3>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                onChange={() => setCreateLead(!createLead)}
              />
              Create the first lead for this company now
            </label>
          </div>

          {/* CONDITIONAL FIELDS */}
          {createLead && (
            <div className="grid md:grid-cols-2 gap-4 mt-3">

              <div>
                <label className="text-sm">Lead Title</label>
                <input
                  name="leadTitle"
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