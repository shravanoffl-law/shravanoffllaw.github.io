const chatBox = document.getElementById("chatBox");

function addMessage(message, sender) {
  let div = document.createElement("div");
  div.classList.add("chat-message", sender);
  div.innerHTML = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  let input = document.getElementById("userInput");
  let text = input.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  input.value = "";
  processMessage(text.toLowerCase());
}

function processMessage(message) {
  let response = "";

  // GST Calculator
  if (message.includes("gst")) {
    let amount = extractNumber(message);
    let rate = extractRate(message);
    if (amount && rate) {
      let gstAmount = (amount * rate) / 100;
      let total = amount + gstAmount;
      response = `GST @${rate}% on ₹${amount} = ₹${gstAmount.toFixed(2)} <br> Total = ₹${total.toFixed(2)} <br> (CGST = ₹${(gstAmount/2).toFixed(2)}, SGST = ₹${(gstAmount/2).toFixed(2)})`;
    } else {
      response = "Please provide amount and GST rate. Example: 'GST on 1000 at 18%'";
    }
  }

  // Income Tax
  else if (message.includes("income tax") || message.includes("tax")) {
    let income = extractNumber(message);
    if (income) {
      response = calculateIncomeTax(income);
    } else {
      response = "Please provide your income. Example: 'Income tax on 800000'";
    }
  }

  // News
  else if (message.includes("news") || message.includes("update")) {
    response = "📢 Latest GST/Tax updates: <br> 👉 <a href='https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2163555' target='_blank'>PIB Press Release</a> <br> 👉 <a href='https://incometaxindia.gov.in/pages/tax-laws-rules.aspx' target='_blank'>Income Tax Laws</a>";
  }

  else {
    response = "🤖 I can help with:<br>- GST Calculation<br>- Income Tax (New Regime AY 2025-26)<br>- Latest Tax News";
  }

  addMessage(response, "bot");
}

function extractNumber(message) {
  let num = message.match(/\d+/g);
  return num ? parseInt(num[0]) : null;
}

function extractRate(message) {
  let rate = message.match(/(\d+)%/);
  return rate ? parseInt(rate[1]) : null;
}

// Income Tax (New Regime AY 2025-26)
function calculateIncomeTax(income) {
  let tax = 0;
  if (income <= 300000) {
    tax = 0;
  } else if (income <= 700000) {
    tax = (income - 300000) * 0.05;
  } else if (income <= 1000000) {
    tax = (400000 * 0.05) + (income - 700000) * 0.10;
  } else if (income <= 1200000) {
    tax = (400000 * 0.05) + (300000 * 0.10) + (income - 1000000) * 0.15;
  } else if (income <= 1500000) {
    tax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (income - 1200000) * 0.20;
  } else {
    tax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (300000 * 0.20) + (income - 1500000) * 0.30;
  }
  return `💰 Income: ₹${income.toLocaleString()} <br> Tax Payable (New Regime AY 2025-26): ₹${tax.toFixed(2)}`;
}







const chatBox = document.getElementById("chatBox");

function addMessage(message, sender) {
  let div = document.createElement("div");
  div.classList.add("chat-message", sender);
  div.innerHTML = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  let input = document.getElementById("userInput");
  let text = input.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  input.value = "";
  processMessage(text.toLowerCase());
}

function processMessage(message) {
  let response = "";

  // GST Calculator
  if (message.includes("gst")) {
    let amount = extractNumber(message);
    let rate = extractRate(message);
    if (amount && rate) {
      let gstAmount = (amount * rate) / 100;
      let total = amount + gstAmount;
      response = `GST @${rate}% on ₹${amount} = ₹${gstAmount.toFixed(2)} <br> Total = ₹${total.toFixed(2)} <br> (CGST = ₹${(gstAmount/2).toFixed(2)}, SGST = ₹${(gstAmount/2).toFixed(2)})`;
    } else {
      response = "Please provide amount and GST rate. Example: 'GST on 1000 at 18%'";
    }
  }

  // Income Tax (Old + New Regime)
  else if (message.includes("income tax") || message.includes("tax")) {
    let income = extractNumber(message);
    if (income) {
      let newRegime = calculateIncomeTaxNew(income);
      let oldRegime = calculateIncomeTaxOld(income);
      response = `💰 Income: ₹${income.toLocaleString()}<br><br>
        📊 <b>New Regime (AY 2025-26)</b>: ₹${newRegime.toFixed(2)}<br>
        📊 <b>Old Regime</b>: ₹${oldRegime.toFixed(2)}<br><br>
        ✅ You pay the lower of the two.`;
    } else {
      response = "Please provide your income. Example: 'Income tax on 800000'";
    }
  }

  // News
  else if (message.includes("news") || message.includes("update")) {
    response = "📢 Latest GST/Tax updates: <br> 👉 <a href='https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2163555' target='_blank'>PIB Press Release</a> <br> 👉 <a href='https://incometaxindia.gov.in/pages/tax-laws-rules.aspx' target='_blank'>Income Tax Laws</a>";
  }

  else {
    response = "🤖 I can help with:<br>- GST Calculation<br>- Income Tax (Old vs New Regime AY 2025-26)<br>- Latest Tax News";
  }

  addMessage(response, "bot");
}

function extractNumber(message) {
  let num = message.match(/\d+/g);
  return num ? parseInt(num[0]) : null;
}

function extractRate(message) {
  let rate = message.match(/(\d+)%/);
  return rate ? parseInt(rate[1]) : null;
}

// ✅ New Regime (AY 2025-26)
function calculateIncomeTaxNew(income) {
  let tax = 0;
  if (income <= 300000) {
    tax = 0;
  } else if (income <= 700000) {
    tax = (income - 300000) * 0.05;
  } else if (income <= 1000000) {
    tax = (400000 * 0.05) + (income - 700000) * 0.10;
  } else if (income <= 1200000) {
    tax = (400000 * 0.05) + (300000 * 0.10) + (income - 1000000) * 0.15;
  } else if (income <= 1500000) {
    tax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (income - 1200000) * 0.20;
  } else {
    tax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (300000 * 0.20) + (income - 1500000) * 0.30;
  }
  return tax;
}

// ✅ Old Regime (with ₹2.5L basic exemption, no deductions considered)
function calculateIncomeTaxOld(income) {
  let tax = 0;
  if (income <= 250000) {
    tax = 0;
  } else if (income <= 500000) {
    tax = (income - 250000) * 0.05;
  } else if (income <= 1000000) {
    tax = (250000 * 0.05) + (income - 500000) * 0.20;
  } else {
    tax = (250000 * 0.05) + (500000 * 0.20) + (income - 1000000) * 0.30;
  }
  return tax;
}




