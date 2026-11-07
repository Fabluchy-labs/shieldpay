import { useState, useEffect } from 'react'
import './App.css'

const API_URL = "http://localhost:5000";
function App() {
  const [showForm, setShowForm] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [editingInvoice, setEditingInvoice] = useState(null)
  const [search, setSearch] = useState('')
  const [apiStatus, setApiStatus] = useState("Checking connection...");

  const [invoices, setInvoices] = useState(() => {
    try {
      const saved = localStorage.getItem('shieldpay_invoices')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [form, setForm] = useState({
    customer: '',
    email: '',
    amount: '',
    description: '',
    dueDate: ''
  })

  useEffect(() => {
    localStorage.setItem(
      'shieldpay_invoices',
      JSON.stringify(invoices)
    )
  }, [invoices]);

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((response) => response.json())
      .then((data) => {
        setApiStatus(data.status);
      })
      .catch(() => {
        setApiStatus("Backend disconnected");
      });
  }, []);

  const today = new Date().toISOString().slice(0, 10)

  const getStatus = (invoice) => {
    if (invoice.status === 'Paid') return 'Paid'
    if (invoice.dueDate < today) return 'Overdue'
    return 'Pending'
  }

  const formatMoney = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const createInvoice = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API_URL}/api/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form.customer,
          email: form.email,
          amount: Number(form.amount),
          description: form.description,
          dueDate: form.dueDate,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to create invoice");
      }
  
      setInvoices((previous) => [data.invoice, ...previous]);
  
      setForm({
        customer: "",
        email: "",
        amount: "",
        description: "",
        dueDate: "",
      });
  
      setShowForm(false);
  
      alert("Invoice created and saved successfully!");
  
    } catch (error) {
      console.error("Invoice creation failed:", error);
      alert(error.message);
    }
  };

  const editInvoice = (updatedInvoice) => {
    setInvoices((currentInvoices) =>
      currentInvoices.map((invoice) =>
        invoice.id === updatedInvoice.id
          ? updatedInvoice
          : invoice
      )
    );
  
    setEditingInvoice(null);
    setSelectedInvoice(null);
    setShowForm(false);
  };
  

  const deleteInvoice = (id) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) {
      return
    }

    setInvoices((previous) =>
      previous.filter((invoice) => invoice.id !== id)
    )

    setSelectedInvoice(null)
  }

  const togglePaymentStatus = (id) => {
    setInvoices((previous) =>
      previous.map((invoice) =>
        invoice.id === id
          ? {
              ...invoice,
              status: invoice.status === 'Paid' ? 'Pending' : 'Paid'
            }
          : invoice
      )
    )

    setSelectedInvoice(null)
  }

  const filteredInvoices = invoices.filter((invoice) =>
    `${invoice.id} ${invoice.customer} ${invoice.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const paidInvoices = invoices.filter(
    (invoice) => getStatus(invoice) === 'Paid'
  )

  const pendingInvoices = invoices.filter(
    (invoice) => getStatus(invoice) === 'Pending'
  )

  const overdueInvoices = invoices.filter(
    (invoice) => getStatus(invoice) === 'Overdue'
  )

  const totalValue = invoices.reduce(
    (total, invoice) => total + invoice.amount,
    0
  )

  const paidValue = paidInvoices.reduce(
    (total, invoice) => total + invoice.amount,
    0
  )

  const pendingValue = invoices
    .filter((invoice) => getStatus(invoice) !== 'Paid')
    .reduce((total, invoice) => total + invoice.amount, 0)

  return (
    <div className="app">

      <aside className="sidebar">
        <h2 className="logo">SHIELD<span>PAY.</span></h2>

        <p className="menu-label">MENU</p>

        <nav>
          <a className="active" href="#dashboard">▦ Dashboard</a>
          <a href="#invoices">▤ Invoices</a>
          <a href="#payments">↗ Payments</a>
          <a href="#transactions">⇄ Transactions</a>
        </nav>

        <div className="sidebar-bottom">
          <a href="#settings">⚙ Settings</a>
          <a href="#help">? Help & Support</a>
        </div>
      </aside>

      <main className="main-content">

        <header className="topbar">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>Dashboard</h1>
            <p className="api-status">
  Backend: {apiStatus}
</p>
          </div>

          <div className="profile">
            <span>Welcome back</span>
            <div className="avatar">S</div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <p>YOUR FINANCIAL OVERVIEW</p>
            <h2>Welcome to ShieldPay.</h2>
            <span>Manage your payments with confidence.</span>
          </div>

          <button onClick={() => setShowForm(true)}>
            + Create Invoice
          </button>
        </section>

        <section className="stats">

          <div className="stat-card">
            <p>Total Invoice Value</p>
            <h2>{formatMoney(totalValue)}</h2>
            <span>All invoices created</span>
          </div>

          <div className="stat-card">
            <p>Paid Amount</p>
            <h2>{formatMoney(paidValue)}</h2>
            <span>{paidInvoices.length} paid invoices</span>
          </div>

          <div className="stat-card">
            <p>Outstanding Amount</p>
            <h2>{formatMoney(pendingValue)}</h2>
            <span>
              {pendingInvoices.length + overdueInvoices.length} unpaid invoices
            </span>
          </div>

        </section>

        <section className="stats secondary-stats">
          <div className="stat-card">
            <p>Total Invoices</p>
            <h2>{invoices.length}</h2>
          </div>

          <div className="stat-card">
            <p>Pending</p>
            <h2>{pendingInvoices.length}</h2>
          </div>

          <div className="stat-card">
            <p>Overdue</p>
            <h2>{overdueInvoices.length}</h2>
          </div>
        </section>

        {showForm && (
          <section className="invoice-form">

            <div className="section-heading">
            {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}

              <button
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => {
  e.preventDefault();

  if (editingInvoice) {
    editInvoice({
      ...editingInvoice,
      ...form,
      amount: Number(form.amount),
    });
    setEditingInvoice(null);
  } else {
    createInvoice(e);
  }
}}>

              <div className="form-grid">

                <label>
                  Customer Name
                  <input
                    name="customer"
                    value={form.customer}
                    onChange={handleChange}
                    placeholder="Customer name"
                    required
                  />
                </label>

                <label>
                  Customer Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="customer@example.com"
                    required
                  />
                </label>

                <label>
                  Invoice Amount (USD)
                  <input
                    type="number"
                    name="amount"
                    min="0.01"
                    step="0.01"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                  />
                </label>

                <label>
                  Due Date
                  <input
                    type="date"
                    name="dueDate"
                    min={today}
                    value={form.dueDate}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="full-width">
                  Description
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the service or product..."
                    required
                  />
                </label>

              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit">
                  Generate Invoice
                </button>
              </div>

            </form>
          </section>
        )}

        <section className="transactions" id="invoices">

          <div className="section-heading">
            <h2>Invoice Management</h2>
            <span>{invoices.length} records</span>
          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search by invoice ID, customer or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredInvoices.length === 0 ? (

            <div className="empty-state">
              <div className="empty-icon">⇄</div>
              <h3>
                {invoices.length === 0
                  ? 'No invoices yet'
                  : 'No matching invoices'}
              </h3>
              <p>
                {invoices.length === 0
                  ? 'Your invoices will appear here.'
                  : 'Try another search term.'}
              </p>
            </div>

          ) : (

            <div className="table-wrapper">

              <table>
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id}>

                      <td>{invoice.id}</td>

                      <td>{invoice.customer}</td>

                      <td>{formatMoney(invoice.amount)}</td>

                      <td>{invoice.dueDate}</td>

                      <td>
                        <span className={`status-badge ${getStatus(invoice).toLowerCase()}`}>
                          {getStatus(invoice)}
                        </span>
                      </td>

                      <td>
                        <button
                          className="view-btn"
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}

        </section>

        {selectedInvoice && (

          <div className="modal-overlay">

            <div className="invoice-modal">
            <div className="invoice-brand">
  <h2>SHIELDPAY<span>.</span></h2>
  <p>Payments made transparent. Businesses made smarter.</p>
  <h3>INVOICE</h3>
</div>

              <div className="section-heading">
                <h2>Invoice Details</h2>

                <button
                  className="close-btn"
                  onClick={() => setSelectedInvoice(null)}
                >
                  ✕
                </button>
              </div>

              <p><strong>Invoice ID:</strong> {selectedInvoice.id}</p>
              <p><strong>Customer:</strong> {selectedInvoice.customer}</p>
              <p><strong>Email:</strong> {selectedInvoice.email}</p>

              <p>
                <strong>Amount:</strong>{' '}
                {formatMoney(selectedInvoice.amount)}
              </p>

              <p><strong>Description:</strong> {selectedInvoice.description}</p>
              <p><strong>Created:</strong> {selectedInvoice.createdAt}</p>
              <p><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>

              <p>
                <strong>Status:</strong> {getStatus(selectedInvoice)}
              </p>
              <button
  className="secondary-btn"
  onClick={() => window.print()}
>
  Download Invoice PDF
</button>
              <div className="form-actions">

                <button
                  className="delete-btn"
                  onClick={() => deleteInvoice(selectedInvoice.id)}
                >
                  Delete Invoice
                </button>
                <button
  onClick={() => {
    setEditingInvoice(selectedInvoice);
    setForm({
      customer: selectedInvoice.customer,
      email: selectedInvoice.email,
      amount: selectedInvoice.amount,
      description: selectedInvoice.description,
      dueDate: selectedInvoice.dueDate,
    });
    setSelectedInvoice(null);
    setShowForm(true);
  }}
>
  Edit Invoice
</button>
                <button
                  onClick={() => togglePaymentStatus(selectedInvoice.id)}
                >
                  {selectedInvoice.status === 'Paid'
                    ? 'Mark as Pending'
                    : 'Mark as Paid'}
                </button>

              </div>

            </div>

          </div>
        )}

        <footer>
          ShieldPay © 2026 · Powered by Stellar
        </footer>

      </main>
    </div>
    );
  }

export default App;
