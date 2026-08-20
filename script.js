/* =========================================================
   GMM SOCIAL GROWTH — SMM PANEL
   COMPLETE FRONTEND JAVASCRIPT
========================================================= */

"use strict";

/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {
    currency: "PKR",
    minQuantity: 100,
    maxQuantity: 1000000,

    /* Demo service prices.
       Replace these with your backend/API prices later. */
    services: {
        instagram_followers: {
            name: "Instagram Followers",
            platform: "Instagram",
            pricePer1000: 350
        },

        instagram_likes: {
            name: "Instagram Likes",
            platform: "Instagram",
            pricePer1000: 180
        },

        instagram_views: {
            name: "Instagram Views",
            platform: "Instagram",
            pricePer1000: 80
        },

        tiktok_followers: {
            name: "TikTok Followers",
            platform: "TikTok",
            pricePer1000: 450
        },

        tiktok_likes: {
            name: "TikTok Likes",
            platform: "TikTok",
            pricePer1000: 160
        },

        tiktok_views: {
            name: "TikTok Views",
            platform: "TikTok",
            pricePer1000: 70
        },

        youtube_subscribers: {
            name: "YouTube Subscribers",
            platform: "YouTube",
            pricePer1000: 850
        },

        youtube_views: {
            name: "YouTube Views",
            platform: "YouTube",
            pricePer1000: 250
        },

        youtube_likes: {
            name: "YouTube Likes",
            platform: "YouTube",
            pricePer1000: 220
        },

        facebook_followers: {
            name: "Facebook Followers",
            platform: "Facebook",
            pricePer1000: 400
        },

        facebook_likes: {
            name: "Facebook Likes",
            platform: "Facebook",
            pricePer1000: 180
        },

        linkedin_followers: {
            name: "LinkedIn Followers",
            platform: "LinkedIn",
            pricePer1000: 1000
        },

        pinterest_followers: {
            name: "Pinterest Followers",
            platform: "Pinterest",
            pricePer1000: 500
        },

        whatsapp_members: {
            name: "WhatsApp Channel Members",
            platform: "WhatsApp",
            pricePer1000: 550
        },

        twitter_followers: {
            name: "X / Twitter Followers",
            platform: "X",
            pricePer1000: 450
        }
    }
};


/* =========================================================
   GLOBAL STATE
========================================================= */

const state = {
    selectedService: null,
    selectedPlatform: "Instagram",
    quantity: 1000,

    balance: 0,

    notifications: [],

    orders: [],

    currentModal: null
};


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
    return [...parent.querySelectorAll(selector)];
};

const getElement = id => {
    return document.getElementById(id);
};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initSidebar();

    initNavigation();

    initProfileDropdown();

    initNotifications();

    initSearch();

    initServiceFilters();

    initServiceButtons();

    initQuickOrder();

    initOrderForm();

    initPlatformSelector();

    initWallet();

    initSupport();

    initSettings();

    initModals();

    initGlobalClicks();

    loadSavedState();

    updateBalanceUI();

    updateCurrentDate();

});


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

    const loader = $(".page-loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("hide");
        }, 450);

    });

    setTimeout(() => {
        loader.classList.add("hide");
    }, 1500);
}


/* =========================================================
   SIDEBAR
========================================================= */

function initSidebar() {

    const sidebar = $(".sidebar");

    const menuToggle = $(".menu-toggle");

    const sidebarClose = $(".sidebar-close");

    const overlay = $(".sidebar-overlay");

    if (!sidebar) return;


    function openSidebar() {

        sidebar.classList.add("open");

        if (overlay) {
            overlay.classList.add("show");
        }
    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        if (overlay) {
            overlay.classList.remove("show");
        }
    }


    if (menuToggle) {
        menuToggle.addEventListener("click", openSidebar);
    }


    if (sidebarClose) {
        sidebarClose.addEventListener("click", closeSidebar);
    }


    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }


    $$(".nav-item").forEach(item => {

        item.addEventListener("click", () => {

            if (window.innerWidth <= 800) {
                closeSidebar();
            }

        });

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    const navItems = $$(".nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", event => {

            const target = item.getAttribute("href");

            if (!target || !target.startsWith("#")) {
                return;
            }

            event.preventDefault();

            const section = document.querySelector(target);

            if (!section) return;

            navItems.forEach(nav => {
                nav.classList.remove("active");
            });

            item.classList.add("active");

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* Update active navigation while scrolling */

    const sections = $$("section[id]");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const id = entry.target.id;

                    navItems.forEach(nav => {

                        nav.classList.toggle(
                            "active",
                            nav.getAttribute("href") === `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(section => {
            observer.observe(section);
        });

    }

}


/* =========================================================
   PROFILE DROPDOWN
========================================================= */

function initProfileDropdown() {

    const profileButton = $(".profile-button");

    const dropdown = $(".profile-dropdown");

    if (!profileButton || !dropdown) return;


    profileButton.addEventListener("click", event => {

        event.stopPropagation();

        dropdown.classList.toggle("show");

    });


    document.addEventListener("click", event => {

        if (
            dropdown.classList.contains("show") &&
            !dropdown.contains(event.target) &&
            !profileButton.contains(event.target)
        ) {

            dropdown.classList.remove("show");

        }

    });

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function initNotifications() {

    const notificationButton =
        $(".notification-button");

    if (!notificationButton) return;


    notificationButton.addEventListener("click", () => {

        openNotificationsModal();

    });

}


function openNotificationsModal() {

    const list = $(".notification-list");

    if (!list) {
        showToast(
            "No new notifications.",
            "info"
        );

        return;
    }


    if (state.notifications.length === 0) {

        list.innerHTML = `
            <div class="table-empty">
                <div>
                    <i class="fa-regular fa-bell-slash"></i>
                </div>

                <strong>No notifications</strong>

                <span>
                    You are all caught up.
                </span>
            </div>
        `;

    } else {

        list.innerHTML =
            state.notifications.map(notification => {

                return `
                    <div class="notification-item">

                        <div class="notification-item-icon">
                            <i class="${notification.icon || "fa-solid fa-bell"}"></i>
                        </div>

                        <div>
                            <strong>${escapeHTML(notification.title)}</strong>

                            <span>
                                ${escapeHTML(notification.message)}
                            </span>
                        </div>

                    </div>
                `;

            }).join("");

    }


    openModal("notificationsModal");
}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

    const searchButton = $(".search-button");

    if (!searchButton) return;


    searchButton.addEventListener("click", () => {

        openModal("searchModal");

        setTimeout(() => {

            const input =
                $("#globalSearchInput");

            if (input) {
                input.focus();
            }

        }, 100);

    });


    const searchInput =
        $("#globalSearchInput");

    if (!searchInput) return;


    searchInput.addEventListener("input", () => {

        performGlobalSearch(
            searchInput.value.trim()
        );

    });

}


function performGlobalSearch(query) {

    const results =
        $(".search-results");

    if (!results) return;


    if (!query) {

        results.innerHTML = `
            <div class="table-empty">

                <div>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>

                <strong>Search services</strong>

                <span>
                    Find followers, likes, views and other services.
                </span>

            </div>
        `;

        return;
    }


    const q = query.toLowerCase();


    const matches =
        Object.entries(CONFIG.services)
            .filter(([key, service]) => {

                return (
                    key.toLowerCase().includes(q) ||
                    service.name.toLowerCase().includes(q) ||
                    service.platform.toLowerCase().includes(q)
                );

            });


    if (matches.length === 0) {

        results.innerHTML = `
            <div class="table-empty">

                <div>
                    <i class="fa-regular fa-face-frown"></i>
                </div>

                <strong>No service found</strong>

                <span>
                    Try another keyword.
                </span>

            </div>
        `;

        return;
    }


    results.innerHTML =
        matches.map(([key, service]) => {

            return `
                <div class="search-result">

                    <div class="search-result-info">

                        <strong>
                            ${escapeHTML(service.name)}
                        </strong>

                        <span>
                            ${escapeHTML(service.platform)}
                            ·
                            ${formatMoney(service.pricePer1000)}
                            / 1K
                        </span>

                    </div>

                    <button
                        type="button"
                        data-service="${key}"
                        class="global-order-btn"
                    >
                        Order
                    </button>

                </div>
            `;

        }).join("");


    $$(".global-order-btn", results)
        .forEach(button => {

            button.addEventListener("click", () => {

                const key =
                    button.dataset.service;

                selectService(key);

                closeModal("searchModal");

                scrollToOrder();

            });

        });

}


/* =========================================================
   SERVICE FILTERS
========================================================= */

function initServiceFilters() {

    const search =
        $(".service-search input");

    const filter =
        $(".service-filter-bar select");


    function filterServices() {

        const searchValue =
            search
                ? search.value.toLowerCase().trim()
                : "";

        const filterValue =
            filter
                ? filter.value.toLowerCase()
                : "all";


        $$(".service-card").forEach(card => {

            const text =
                card.textContent.toLowerCase();

            const platform =
                (
                    card.dataset.platform ||
                    ""
                ).toLowerCase();


            const matchesSearch =
                !searchValue ||
                text.includes(searchValue);


            const matchesPlatform =
                filterValue === "all" ||
                platform === filterValue;


            card.classList.toggle(
                "hidden",
                !(matchesSearch && matchesPlatform)
            );

        });

    }


    if (search) {
        search.addEventListener(
            "input",
            filterServices
        );
    }


    if (filter) {
        filter.addEventListener(
            "change",
            filterServices
        );
    }

}


/* =========================================================
   SERVICE BUTTONS
========================================================= */

function initServiceButtons() {

    $$(".service-order-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const serviceKey =
                    button.dataset.service ||
                    button.closest(".service-card")
                        ?.dataset.service;


                if (serviceKey) {

                    selectService(serviceKey);

                    scrollToOrder();

                } else {

                    showToast(
                        "Please select a service.",
                        "info"
                    );

                }

            });

        });

}


/* =========================================================
   SELECT SERVICE
========================================================= */

function selectService(serviceKey) {

    const service =
        CONFIG.services[serviceKey];

    if (!service) return;


    state.selectedService = serviceKey;

    state.selectedPlatform =
        service.platform;


    const serviceSelect =
        $("#orderService");

    if (serviceSelect) {

        let option =
            [...serviceSelect.options]
                .find(
                    opt =>
                        opt.value === serviceKey
                );


        if (!option) {

            option =
                document.createElement("option");

            option.value = serviceKey;

            option.textContent =
                `${service.name} — ${formatMoney(service.pricePer1000)} / 1K`;

            serviceSelect.appendChild(option);

        }


        serviceSelect.value =
            serviceKey;

    }


    updateOrderSummary();

    showToast(
        `${service.name} selected.`,
        "success"
    );

}


/* =========================================================
   QUICK ORDER
========================================================= */

function initQuickOrder() {

    const form =
        $("#quickOrderForm");

    if (!form) return;


    form.addEventListener("submit", event => {

        event.preventDefault();


        const serviceSelect =
            $("#quickService");

        const linkInput =
            $("#quickLink");

        const quantityInput =
            $("#quickQuantity");


        const serviceKey =
            serviceSelect?.value;

        const link =
            linkInput?.value.trim();

        const quantity =
            Number(quantityInput?.value);


        if (!serviceKey) {

            showToast(
                "Please select a service.",
                "error"
            );

            return;
        }


        if (!validURL(link)) {

            showToast(
                "Please enter a valid social media link.",
                "error"
            );

            return;
        }


        if (!validQuantity(quantity)) {

            showToast(
                `Quantity must be between ${CONFIG.minQuantity.toLocaleString()} and ${CONFIG.maxQuantity.toLocaleString()}.`,
                "error"
            );

            return;
        }


        selectService(serviceKey);

        const orderLink =
            $("#orderLink");

        const orderQuantity =
            $("#orderQuantity");


        if (orderLink) {
            orderLink.value = link;
        }

        if (orderQuantity) {
            orderQuantity.value = quantity;
        }


        scrollToOrder();


        showToast(
            "Order details transferred to the order form.",
            "success"
        );

    });

}


/* =========================================================
   ORDER FORM
========================================================= */

function initOrderForm() {

    const serviceSelect =
        $("#orderService");

    const quantityInput =
        $("#orderQuantity");

    const linkInput =
        $("#orderLink");


    if (serviceSelect) {

        serviceSelect.addEventListener(
            "change",
            () => {

                state.selectedService =
                    serviceSelect.value;

                updateOrderSummary();

            }
        );

    }


    if (quantityInput) {

        quantityInput.addEventListener(
            "input",
            () => {

                state.quantity =
                    Number(quantityInput.value) || 0;

                updateOrderSummary();

            }
        );

    }


    if (linkInput) {

        linkInput.addEventListener(
            "input",
            () => {

                updateOrderSummary();

            }
        );

    }


    const orderForm =
        $("#mainOrderForm");


    if (orderForm) {

        orderForm.addEventListener(
            "submit",
            submitOrder
        );

    }

}


/* =========================================================
   PLATFORM SELECTOR
========================================================= */

function initPlatformSelector() {

    $$(".platform-choice input")
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    if (!input.checked) return;

                    state.selectedPlatform =
                        input.value;

                    updatePlatformServices(
                        input.value
                    );

                }
            );

        });

}


function updatePlatformServices(platform) {

    const serviceSelect =
        $("#orderService");

    if (!serviceSelect) return;


    const platformServices =
        Object.entries(CONFIG.services)
            .filter(
                ([, service]) =>
                    service.platform === platform
            );


    if (!platformServices.length) return;


    serviceSelect.innerHTML =
        `<option value="">Choose a service</option>`;


    platformServices.forEach(
        ([key, service]) => {

            const option =
                document.createElement("option");

            option.value = key;

            option.textContent =
                `${service.name} — ${formatMoney(service.pricePer1000)} / 1K`;

            serviceSelect.appendChild(option);

        }
    );


    state.selectedService = null;

    updateOrderSummary();

}


/* =========================================================
   ORDER SUMMARY
========================================================= */

function updateOrderSummary() {

    const summary =
        $(".summary-content");

    const empty =
        $(".summary-empty");

    if (!summary) return;


    const serviceKey =
        state.selectedService ||
        $("#orderService")?.value;


    const quantity =
        Number(
            $("#orderQuantity")?.value
        ) || 0;


    if (!serviceKey || !CONFIG.services[serviceKey]) {

        if (empty) {
            empty.style.display = "block";
        }

        summary.style.display = "none";

        return;

    }


    const service =
        CONFIG.services[serviceKey];


    if (empty) {
        empty.style.display = "none";
    }

    summary.style.display = "block";


    const total =
        calculatePrice(
            service.pricePer1000,
            quantity
        );


    const summaryService =
        $("#summaryService");

    const summaryQuantity =
        $("#summaryQuantity");

    const summaryPrice =
        $("#summaryPrice");

    const summaryTotal =
        $("#summaryTotal");


    if (summaryService) {
        summaryService.textContent =
            service.name;
    }


    if (summaryQuantity) {
        summaryQuantity.textContent =
            quantity
                ? quantity.toLocaleString()
                : "0";
    }


    if (summaryPrice) {
        summaryPrice.textContent =
            formatMoney(service.pricePer1000);
    }


    if (summaryTotal) {
        summaryTotal.textContent =
            formatMoney(total);
    }

}


/* =========================================================
   SUBMIT ORDER
========================================================= */

function submitOrder(event) {

    event.preventDefault();


    const serviceKey =
        $("#orderService")?.value ||
        state.selectedService;


    const link =
        $("#orderLink")?.value.trim();


    const quantity =
        Number(
            $("#orderQuantity")?.value
        );


    if (!serviceKey) {

        showToast(
            "Please choose a service.",
            "error"
        );

        return;

    }


    if (!validURL(link)) {

        showToast(
            "Please enter a valid social media URL.",
            "error"
        );

        return;

    }


    if (!validQuantity(quantity)) {

        showToast(
            "Please enter a valid quantity.",
            "error"
        );

        return;

    }


    const service =
        CONFIG.services[serviceKey];


    const total =
        calculatePrice(
            service.pricePer1000,
            quantity
        );


    if (total > state.balance) {

        showToast(
            "Insufficient wallet balance. Please add funds first.",
            "error"
        );

        openModal("paymentModal");

        return;

    }


    const order = {

        id:
            generateOrderID(),

        service:
            service.name,

        platform:
            service.platform,

        link,

        quantity,

        amount:
            total,

        status:
            "Pending",

        createdAt:
            new Date().toISOString()

    };


    state.orders.unshift(order);

    state.balance -= total;


    saveState();

    updateBalanceUI();

    renderOrders();


    showToast(
        `Order #${order.id} created successfully.`,
        "success"
    );


    event.target.reset();

    state.selectedService = null;

    updateOrderSummary();


    scrollToOrders();

}


/* =========================================================
   ORDERS
========================================================= */

function renderOrders() {

    const tbody =
        $(".orders-table tbody");

    if (!tbody) return;


    if (!state.orders.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="table-empty">

                        <div>
                            <i class="fa-solid fa-box-open"></i>
                        </div>

                        <strong>No orders yet</strong>

                        <span>
                            Your orders will appear here.
                        </span>

                    </div>
                </td>
            </tr>
        `;

        return;
    }


    tbody.innerHTML =
        state.orders
            .slice(0, 30)
            .map(order => {

                const statusClass =
                    getStatusClass(order.status);


                return `
                    <tr>

                        <td>
                            #${escapeHTML(order.id)}
                        </td>

                        <td>
                            ${escapeHTML(order.service)}
                        </td>

                        <td>
                            ${escapeHTML(order.platform)}
                        </td>

                        <td>
                            ${Number(order.quantity)
                                .toLocaleString()}
                        </td>

                        <td>
                            ${formatMoney(order.amount)}
                        </td>

                        <td>
                            <span class="service-status ${statusClass}">
                                ${escapeHTML(order.status)}
                            </span>
                        </td>

                        <td>
                            ${formatDate(order.createdAt)}
                        </td>

                    </tr>
                `;

            })
            .join("");

}


function getStatusClass(status) {

    const normalized =
        status.toLowerCase();

    if (normalized === "completed") {
        return "status-completed";
    }

    if (normalized === "processing") {
        return "status-processing";
    }

    if (normalized === "cancelled") {
        return "status-cancelled";
    }

    return "status-pending";

}


/* =========================================================
   WALLET
========================================================= */

function initWallet() {

    const addFundsButtons =
        $$(".add-funds-btn, [data-action='add-funds']");


    addFundsButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openModal("paymentModal");

            }
        );

    });


    const paymentForm =
        $("#paymentForm");


    if (paymentForm) {

        paymentForm.addEventListener(
            "submit",
            handlePayment
        );

    }


    $$(".payment-method")
        .forEach(method => {

            method.addEventListener(
                "click",
                () => {

                    const methodName =
                        method.dataset.method ||
                        method.textContent.trim();


                    showToast(
                        `${methodName} selected.`,
                        "info"
                    );

                }
            );

        });

}


function handlePayment(event) {

    event.preventDefault();


    const amountInput =
        $("#fundAmount");


    const amount =
        Number(amountInput?.value);


    if (!amount || amount <= 0) {

        showToast(
            "Enter a valid amount.",
            "error"
        );

        return;

    }


    /*
       IMPORTANT:
       This is only a frontend/demo wallet update.

       Real payments must be confirmed by your
       backend + payment gateway/webhook before
       adding money to a customer's balance.
    */


    showToast(
        "Payment request created. Connect your payment gateway/backend to confirm the payment.",
        "info"
    );


    closeModal("paymentModal");

}


/* =========================================================
   BALANCE UI
========================================================= */

function updateBalanceUI() {

    const formatted =
        formatMoney(state.balance);


    $$(".balance-value").forEach(element => {

        element.textContent =
            formatted;

    });


    $$(".wallet-balance").forEach(element => {

        element.textContent =
            formatted;

    });


    const topBalance =
        $(".topbar-balance strong");

    if (topBalance) {
        topBalance.textContent =
            formatted;
    }


    const walletBalance =
        $(".wallet-main-card > strong");

    if (walletBalance) {
        walletBalance.textContent =
            formatted;
    }

}


/* =========================================================
   SUPPORT
========================================================= */

function initSupport() {

    $$(".support-card button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const title =
                        button.closest(".support-card")
                            ?.querySelector("h3")
                            ?.textContent ||
                        "Support";


                    showToast(
                        `${title} opened.`,
                        "info"
                    );

                }
            );

        });

}


/* =========================================================
   SETTINGS
========================================================= */

function initSettings() {

    $$(".switch input")
        .forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    const setting =
                        input.closest(".settings-item")
                            ?.querySelector("strong")
                            ?.textContent ||
                        "Setting";


                    showToast(
                        `${setting} ${input.checked ? "enabled" : "disabled"}.`,
                        "success"
                    );

                }
            );

        });

}


/* =========================================================
   MODALS
========================================================= */

function initModals() {

    $$(".modal-close")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const modal =
                        button.closest(".modal");

                    if (modal) {
                        closeModal(modal.id);
                    }

                }
            );

        });


    $$(".modal-backdrop")
        .forEach(backdrop => {

            backdrop.addEventListener(
                "click",
                () => {

                    const modal =
                        backdrop.closest(".modal");

                    if (modal) {
                        closeModal(modal.id);
                    }

                }
            );

        });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            $$(".modal.show")
                .forEach(modal => {

                    closeModal(modal.id);

                });

        }
    );

}


function openModal(id) {

    const modal =
        getElement(id);

    if (!modal) return;


    modal.classList.add("show");

    document.body.classList.add(
        "modal-open"
    );

    state.currentModal = id;

}


function closeModal(id) {

    const modal =
        getElement(id);

    if (!modal) return;


    modal.classList.remove("show");

    document.body.classList.remove(
        "modal-open"
    );


    if (state.currentModal === id) {
        state.currentModal = null;
    }

}


/* =========================================================
   GLOBAL CLICKS
========================================================= */

function initGlobalClicks() {

    document.addEventListener(
        "click",
        event => {

            const actionButton =
                event.target.closest(
                    "[data-action]"
                );


            if (!actionButton) return;


            const action =
                actionButton.dataset.action;


            switch (action) {

                case "add-funds":
                    openModal("paymentModal");
                    break;


                case "notifications":
                    openNotificationsModal();
                    break;


                case "search":
                    openModal("searchModal");
                    break;


                case "logout":
                    handleLogout();
                    break;


                case "scroll-order":
                    scrollToOrder();
                    break;


                case "scroll-orders":
                    scrollToOrders();
                    break;


                default:
                    break;

            }

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function handleLogout() {

    const confirmed =
        window.confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) return;


    showToast(
        "Logout is ready to be connected with your authentication system.",
        "info"
    );

}


/* =========================================================
   TOAST SYSTEM
========================================================= */

function showToast(
    message,
    type = "success",
    duration = 3500
) {

    let container =
        $(".toast-container");


    if (!container) {

        container =
            document.createElement("div");

        container.className =
            "toast-container";

        document.body.appendChild(
            container
        );

    }


    const toast =
        document.createElement("div");

    toast.className =
        "toast";


    let icon =
        "fa-solid fa-circle-check";


    if (type === "error") {
        icon = "fa-solid fa-circle-exclamation";
    }

    if (type === "info") {
        icon = "fa-solid fa-circle-info";
    }

    if (type === "warning") {
        icon = "fa-solid fa-triangle-exclamation";
    }


    toast.innerHTML = `

        <div class="toast-icon">
            <i class="${icon}"></i>
        </div>

        <div class="toast-message">
            ${escapeHTML(message)}
        </div>

        <button
            type="button"
            class="toast-close"
            aria-label="Close"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>

    `;


    container.appendChild(toast);


    const close =
        () => {

            toast.classList.add(
                "removing"
            );

            setTimeout(
                () => toast.remove(),
                300
            );

        };


    $(".toast-close", toast)
        .addEventListener(
            "click",
            close
        );


    setTimeout(
        close,
        duration
    );

}


/* =========================================================
   HELPERS
========================================================= */

function formatMoney(amount) {

    const number =
        Number(amount) || 0;


    return new Intl.NumberFormat(
        "en-PK",
        {
            style: "currency",
            currency: CONFIG.currency,
            maximumFractionDigits: 2
        }
    ).format(number);

}


function calculatePrice(
    pricePer1000,
    quantity
) {

    if (!quantity || quantity <= 0) {
        return 0;
    }


    return (
        Number(pricePer1000) *
        Number(quantity)
    ) / 1000;

}


function validQuantity(quantity) {

    return (
        Number.isFinite(quantity) &&
        quantity >= CONFIG.minQuantity &&
        quantity <= CONFIG.maxQuantity
    );

}


function validURL(value) {

    if (!value) return false;


    try {

        const url =
            new URL(value);


        return (
            url.protocol === "http:" ||
            url.protocol === "https:"
        );

    } catch {

        return false;

    }

}


function generateOrderID() {

    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    return String(random);

}


function formatDate(date) {

    const d =
        new Date(date);


    if (Number.isNaN(d.getTime())) {
        return "-";
    }


    return d.toLocaleDateString(
        "en-PK",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function updateCurrentDate() {

    $$(".current-date")
        .forEach(element => {

            element.textContent =
                new Date().toLocaleDateString(
                    "en-PK",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                );

        });

}


function scrollToOrder() {

    const section =
        $("#order");


    if (!section) return;


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function scrollToOrders() {

    const section =
        $("#orders");


    if (!section) return;


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveState() {

    try {

        localStorage.setItem(
            "gmm_smm_state",
            JSON.stringify({
                balance: state.balance,
                orders: state.orders
            })
        );

    } catch (error) {

        console.warn(
            "Unable to save local state.",
            error
        );

    }

}


function loadSavedState() {

    try {

        const saved =
            localStorage.getItem(
                "gmm_smm_state"
            );


        if (!saved) {

            renderOrders();

            return;

        }


        const data =
            JSON.parse(saved);


        if (
            typeof data.balance === "number"
        ) {

            state.balance =
                data.balance;

        }


        if (
            Array.isArray(data.orders)
        ) {

            state.orders =
                data.orders;

        }


        renderOrders();

    } catch (error) {

        console.warn(
            "Unable to load saved state.",
            error
        );

        renderOrders();

    }

}


/* =========================================================
   DEMO DATA
========================================================= */

function addDemoNotification() {

    state.notifications.push({

        title:
            "Welcome to GMM Social Growth",

        message:
            "Your dashboard is ready. Add funds and create your first order.",

        icon:
            "fa-solid fa-rocket"

    });

}


/* =========================================================
   INITIAL DEMO NOTIFICATION
========================================================= */

if (
    !localStorage.getItem(
        "gmm_first_visit"
    )
) {

    addDemoNotification();

    localStorage.setItem(
        "gmm_first_visit",
        "true"
    );

}


/* =========================================================
   SERVICE CARD AUTO DATA
========================================================= */

function autoBindServiceCards() {

    $$(".service-card")
        .forEach(card => {

            const key =
                card.dataset.service;


            if (!key) return;


            const service =
                CONFIG.services[key];


            if (!service) return;


            const price =
                $(".service-price", card);


            if (price) {

                price.textContent =
                    formatMoney(
                        service.pricePer1000
                    );

            }

        });

}


document.addEventListener(
    "DOMContentLoaded",
    autoBindServiceCards
);


/* =========================================================
   LIVE QUANTITY LIMITS
========================================================= */

function setupQuantityLimits() {

    const quantity =
        $("#orderQuantity");


    if (!quantity) return;


    quantity.min =
        CONFIG.minQuantity;


    quantity.max =
        CONFIG.maxQuantity;

}


document.addEventListener(
    "DOMContentLoaded",
    setupQuantityLimits
);


/* =========================================================
   SERVICE SELECT AUTO POPULATION
========================================================= */

function populateServiceSelects() {

    const selects = [

        $("#orderService"),

        $("#quickService")

    ];


    selects.forEach(select => {

        if (!select) return;


        /*
         * Keep an existing first option.
         */

        const firstOption =
            select.options[0];


        select.innerHTML = "";


        if (firstOption) {

            select.appendChild(
                firstOption
            );

        }


        Object.entries(
            CONFIG.services
        ).forEach(
            ([key, service]) => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    key;


                option.textContent =
                    `${service.name} — ${formatMoney(service.pricePer1000)} / 1K`;


                select.appendChild(
                    option
                );

            }
        );

    });

}


document.addEventListener(
    "DOMContentLoaded",
    populateServiceSelects
);


/* =========================================================
   ONLINE STATUS
========================================================= */

function updateOnlineStatus() {

    const elements =
        $$(".online-status");


    elements.forEach(element => {

        if (navigator.onLine) {

            element.textContent =
                "Online";

            element.classList.add(
                "online"
            );

            element.classList.remove(
                "offline"
            );

        } else {

            element.textContent =
                "Offline";

            element.classList.add(
                "offline"
            );

            element.classList.remove(
                "online"
            );

        }

    });

}


window.addEventListener(
    "online",
    updateOnlineStatus
);

window.addEventListener(
    "offline",
    updateOnlineStatus
);

document.addEventListener(
    "DOMContentLoaded",
    updateOnlineStatus
);


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * Ctrl + K = Search
         */

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openModal("searchModal");

            setTimeout(() => {

                $("#globalSearchInput")
                    ?.focus();

            }, 100);

        }

    }
);


/* =========================================================
   FINAL INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateOrderSummary();

        updateBalanceUI();

        renderOrders();

    }
);
