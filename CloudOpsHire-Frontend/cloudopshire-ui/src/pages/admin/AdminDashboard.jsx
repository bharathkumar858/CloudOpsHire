import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const MONTHLY = [
  { month: "Jan", jobs: 12, applications: 89, hires: 5 },
  { month: "Feb", jobs: 18, applications: 134, hires: 8 },
  { month: "Mar", jobs: 24, applications: 198, hires: 12 },
  { month: "Apr", jobs: 31, applications: 267, hires: 15 },
  { month: "May", jobs: 28, applications: 312, hires: 18 },
];

const USER_GROWTH = [
  { month: "Jan", candidates: 120, recruiters: 18 },
  { month: "Feb", candidates: 198, recruiters: 27 },
  { month: "Mar", candidates: 310, recruiters: 45 },
  { month: "Apr", candidates: 489, recruiters: 62 },
  { month: "May", candidates: 731, recruiters: 89 },
];

const TOP_SKILLS = [
  { skill: "Java", count: 89 },
  { skill: "React", count: 76 },
  { skill: "Python", count: 71 },
  { skill: "AWS", count: 64 },
  { skill: "Docker", count: 58 },
  { skill: "K8s", count: 43 },
];

const JOB_TYPES_PIE = [
  { name: "Full Time", value: 62, color: "#2563eb" },
  { name: "Remote", value: 21, color: "#16a34a" },
  { name: "Contract", value: 10, color: "#9333ea" },
  { name: "Internship", value: 7, color: "#f59e0b" },
];

function KpiCard({ label, value, change, positive }) {
  return (
    <div className="card">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      <p
        className={`text-sm mt-1 flex items-center gap-1 ${
          positive ? "text-green-600" : "text-red-500"
        }`}
      >
        <span>{positive ? "↑" : "↓"}</span>
        <span>{change} vs last month</span>
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="page-title">Admin Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">
          Platform-wide metrics and insights
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Total Users" value="1,342" change="+18%" positive />
        <KpiCard label="Active Jobs" value="113" change="+12%" positive />
        <KpiCard label="Applications" value="3,891" change="+24%" positive />
        <KpiCard label="Avg Time-to-Hire" value="18d" change="-3d" positive />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="section-title mb-4">Monthly Jobs vs Applications</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar
                dataKey="jobs"
                fill="#2563eb"
                radius={[3, 3, 0, 0]}
                name="Jobs"
              />
              <Bar
                dataKey="applications"
                fill="#93c5fd"
                radius={[3, 3, 0, 0]}
                name="Applications"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="section-title mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={USER_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="candidates"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Candidates"
              />
              <Line
                type="monotone"
                dataKey="recruiters"
                stroke="#9333ea"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Recruiters"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <h2 className="section-title mb-4">Job Type Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={JOB_TYPES_PIE}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
                labelLine={false}
              >
                {JOB_TYPES_PIE.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 card">
          <h2 className="section-title mb-4">Most In-Demand Skills</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={TOP_SKILLS} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="skill"
                tick={{ fontSize: 12 }}
                width={50}
              />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activity table */}
      <div className="card">
        <h2 className="section-title mb-4">Recent Platform Activity</h2>
        <div className="space-y-3">
          {[
            {
              icon: "👤",
              msg: "New recruiter registered: TechCorp India",
              time: "2 min ago",
              color: "bg-blue-50",
            },
            {
              icon: "💼",
              msg: "New job posted: Senior Java Developer",
              time: "15 min ago",
              color: "bg-green-50",
            },
            {
              icon: "📄",
              msg: "Resume uploaded and ATS scored: 91%",
              time: "1 hr ago",
              color: "bg-purple-50",
            },
            {
              icon: "✅",
              msg: "Application status updated to SHORTLISTED",
              time: "2 hr ago",
              color: "bg-yellow-50",
            },
            {
              icon: "📧",
              msg: "Email notification sent to 3 candidates",
              time: "3 hr ago",
              color: "bg-orange-50",
            },
          ].map((a, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-lg ${a.color}`}
            >
              <span className="text-xl">{a.icon}</span>
              <span className="flex-1 text-sm text-gray-700">{a.msg}</span>
              <span className="text-xs text-gray-400 flex-shrink-0">
                {a.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
