/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Order, Customer } from "../types"
import logo from "../assets/logo.png"

const imageToBase64 = async () => {
  try {
    const response = await fetch(logo)
    const blob = await response.blob()
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  } catch (error) {
    console.error("Error fetching image:", error)
    return null
  }
}

export const handleDownloadReceipt = async (
  order: Order,
  customer: Customer,
  promoCode?: string,
  discount?: number
) => {
  const doc = new jsPDF()

  const logoDataUrl = await imageToBase64()
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "PNG", 14, 10, 50, 20)
  }

  // Header
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("Receipt", 105, 20, { align: "center" })

  // Date
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(`Date: ${order.date}`, 160, 20)

  // Draw line
  doc.setDrawColor(150)
  doc.line(14, 35, 196, 35)

  // Seller and customer details
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("Bill From:", 14, 45)
  doc.setFont("helvetica", "normal")
  doc.text("Test Company", 14, 51)
  doc.text("456 Market Street, City, Country", 14, 57)
  doc.text("Contact: +91 9876543210", 14, 63)

  doc.setFont("helvetica", "bold")
  doc.text("Bill To:", 120, 45)
  doc.setFont("helvetica", "normal")
  doc.text(`Name: ${customer.name}`, 120, 51)
  const addressLines = doc.splitTextToSize(`Address: ${customer.address}`, 80)
  doc.text(addressLines, 120, 57)
  doc.text(`Pincode: ${customer.pincode}`, 120, 57 + addressLines.length * 6)
  doc.text(`Contact: ${customer.mobile}`, 120, 63 + addressLines.length * 6)

  // Product details table
  const tableColumn = ["Item", "Quantity", "Rate", "Tax (18%)", "Total"]
  const tableRows: any[] = []

  order.items.forEach((item) => {
    const itemData = [
      item.title,
      item.quantity,
      `INR ${item.price.toFixed(2)}`,
      `INR ${(item.price * item.quantity * 0.18).toFixed(2)}`, // 18% tax
      `INR ${(item.price * item.quantity * 1.18).toFixed(2)}`,
    ]
    tableRows.push(itemData)
  })

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 70 + addressLines.length * 6,
    theme: "grid",
    headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
    styles: { fontSize: 10, cellPadding: 4 },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  })

  // Totals
  const finalY = (doc as any).lastAutoTable.finalY + 10
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const tax = subtotal * 0.18
  const total = subtotal + tax + (order?.deliveryCharge || 0)
  const paid = total - (discount || 0)

  doc.setFont("helvetica", "bold")
  doc.text(`Subtotal: INR ${subtotal.toFixed(2)}`, 14, finalY)
  doc.text(`Tax: INR ${tax.toFixed(2)}`, 14, finalY + 6)
  if (order?.deliveryCharge) {
    doc.text(`Delivery Charge: INR ${order.deliveryCharge}`, 14, finalY + 12)
  }
  doc.text(`Total: INR ${total.toFixed(2)}`, 14, finalY + 18)
  if (promoCode) {
    doc.text(`Promo Code: ${promoCode}`, 14, finalY + 24)
    doc.text(`Discount: INR ${discount?.toFixed(2)}`, 14, finalY + 30)
  } else {
    doc.text(`Promo Code: None applied`, 14, finalY + 24)
    doc.text(`Discount: INR 0.00`, 14, finalY + 30)
  }
  doc.text(`Paid: INR ${paid.toFixed(2)}`, 14, finalY + 36)

  // Terms and conditions
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.text("Terms & Conditions:", 14, finalY + 46)
  doc.text("1. All sales are final.", 14, finalY + 52)
  doc.text("2. No returns after 30 days.", 14, finalY + 58)
  doc.text(
    "3. Warranty valid for 1 year from the date of purchase.",
    14,
    finalY + 64
  )

  // Save the PDF
  doc.save(`receipt_${order.id}.pdf`)
}
