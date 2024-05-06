
/* APPLICATION ROUTE CONSTANTS */

module.exports = Object.freeze({

    /* Routers Link supplier_app */
    HOME: '/home',
    DASHBOARD: '/dashboard',

    // SUPPILER
    SUPPILER_REGISTRATION: '/supplier-registration',
    SUPPILER_LIST: '/supplier-list',
    SUPPILER_MASS_UPLOAD: '/supplier-mass-upload',
    SUPPLIER_MASTER_CREATE: '/supplier-master-creation',
    SUPPLIER_DETAILED_PAGE_CREATE:'/supplier-details',

    // SOURCING 
    SOURCING_PURCHASE_REQUISITION: '/purchase-requisition',
    SOURCING_REQUEST_FOR_QUOTATION: '/request-for-quotation',
    SOURCING_CREATE_RFQ: '/create-request-for-quotation',
    SOURCING_QUOTATION: '/quotation',
    SOURCING_PURCHASE_REQUISITION_DETAILED_PAGE: '/purchase-requisition-details',
  

    //PO COLLABRATION
    POCOLLABRATION_PURCHASE_ORDER:'/purchase-order',
    POCOLLABRATION_PURCHASE_ORDER_DETAIL_PAGE:'/purchase-order-detail',
    POCOLLABRATION_GOODS_RECEIVED_NOTE:'/goods-received-note',
    POCOLLABRATION_SERVICE_ENTRY_SHEET:'/service-entry-sheet',
    POCOLLABRATION_INVOICE:'/invoice',
    POCOLLABRATION_PAYMENT:'/payments',
    POCOLLABRATION_ASN:'/advanced-shipping-notice',    
    POCOLLABRATION_ASN_DETAIL_PAGE:'/asn-detail',
    POCOLLABRATION_SCHEDULING_AGREEMENT:'/scheduling-agreement',
    
    //SAP REPROCESS
    SAPREPROCESS_GRN_REPROCESS:'/grn-reprocess',
    SAPREPROCESS_SES_REPROCESS:'/ses-reprocess',
    SAPREPROCESS_INVOICE_REPROCESS:'/invoice-reprocess',

    
    //USER DELEGATION
    USER_DELEGATION:'/user-deletion',

    //ADMIN
    ADMIN_MANAGE_USER:'/manage-user',
    ADMIN_MANAGE_ROLE:'/manage-role',

    //AUCTION
    AUCTION_REVERSE_AUCTION_LIST:'/reverse-auction-list',
    AUCTION_REVERSE_AUCTION_HISTORY:'/reverse-auction-history',
    AUCTION_FORWARD_AUCTION_LIST:'/forward-auction-list',
    AUCTION_FORWARD_AUCTION_HISTORY:'/forward-auction-history',

    //CONTRACT MANAGEMENT  
    CONTRACTMANAGEMENT_CONTRACT_GENERATE_LIST:'/contract-generate-list',
    CONTRACTMANAGEMENT_CONTRACT_REVIEW_LIST:'/contract-review-list',
    CONTRACTMANAGEMENT_CONTRACT_DRAFT_TO_FINAL_LIST:'/contract-draft-final-list',
    CONTRACTMANAGEMENT_MONITORING_LIST:'/contract-monitoring-list',

    //GATEPASS
    GATEPASS_GATEPASS_CREATE:'/gatepass-create',
    GATEPASS_GATEPASS_LIST:'/gatepass-list',
    GATEPASS_GATEPASS_DETAIL_PAGE:'/gatepass-detail',
  



  
    /* Routers Link */
    NOT_FOUND: "pages-faq.html",
    LOGIN: "/login",
    REGISTER: '/registeration',
    CALLBACK: '/callback',

    
    SETTINGS: '/settings',
    PROFILE: '/profile',
    COMPANY: '/company',
    PAYMENT: '/payment',
    USERS: '/users',
    LOCATION: '/location',
    UPCOMING_SHIFT: '/upcoming-shifts',
    ONGOING_SHIFT: '/todays-shifts',
    PAST_SHIFT: '/past-shifts',
    EVENT_DETAILS: '/event-details',
    EDIT_TIMESHEET: '/edit-timesheet',
    MANAGE_SHIFT: '/manage-shift',
    BOOKSHIFT: '/bookshift',


    /* Positions Master Data */

    ROW_PER_PAGE : [10, 50, 100, 300, 500],

    SHIFT_TIMES: [
        {
          "id": 0,
          "name": "00:00"
        },
        {
          "id": 1,
          "name": "4:00 AM"
        },
        {
          "id": 2,
          "name": "4:15 AM"
        },
        {
          "id": 3,
          "name": "4:30 AM"
        },
        {
          "id": 4,
          "name": "4:45 AM"
        },
        {
          "id": 5,
          "name": "5:00 AM"
        },
        {
          "id": 6,
          "name": "5:15 AM"
        },
        {
          "id": 7,
          "name": "5:30 AM"
        },
        {
          "id": 8,
          "name": "5:45 AM"
        },
        {
          "id": 9,
          "name": "6:00 AM"
        },
        {
          "id": 10,
          "name": "6:15 AM"
        },
        {
          "id": 11,
          "name": "6:30 AM"
        },
        {
          "id": 12,
          "name": "6:45 AM"
        },
        {
          "id": 13,
          "name": "7:00 AM"
        },
        {
          "id": 14,
          "name": "7:15 AM"
        },
        {
          "id": 15,
          "name": "7:30 AM"
        },
        {
          "id": 16,
          "name": "7:45 AM"
        },
        {
          "id": 17,
          "name": "8:00 AM"
        },
        {
          "id": 18,
          "name": "8:15 AM"
        },
        {
          "id": 19,
          "name": "8:30 AM"
        },
        {
          "id": 20,
          "name": "8:45 AM"
        },
        {
          "id": 21,
          "name": "9:00 AM"
        },
        {
          "id": 22,
          "name": "9:15 AM"
        },
        {
          "id": 23,
          "name": "9:30 AM"
        },
        {
          "id": 24,
          "name": "9:45 AM"
        },
        {
          "id": 25,
          "name": "10:00 AM"
        },
        {
          "id": 26,
          "name": "10:15 AM"
        },
        {
          "id": 27,
          "name": "10:30 AM"
        },
        {
          "id": 28,
          "name": "10:45 AM"
        },
        {
          "id": 29,
          "name": "11:00 AM"
        },
        {
          "id": 30,
          "name": "11:15 AM"
        },
        {
          "id": 31,
          "name": "11:30 AM"
        },
        {
          "id": 32,
          "name": "11:45 AM"
        },
        {
          "id": 33,
          "name": "12:00 PM"
        },
        {
          "id": 34,
          "name": "12:15 PM"
        },
        {
          "id": 35,
          "name": "12:30 PM"
        },
        {
          "id": 36,
          "name": "12:45 PM"
        },
        {
          "id": 37,
          "name": "1:00 PM"
        },
        {
          "id": 38,
          "name": "1:15 PM"
        },
        {
          "id": 39,
          "name": "1:30 PM"
        },
        {
          "id": 40,
          "name": "1:45 PM"
        },
        {
          "id": 41,
          "name": "2:00 PM"
        },
        {
          "id": 42,
          "name": "2:15 PM"
        },
        {
          "id": 43,
          "name": "2:30 PM"
        },
        {
          "id": 44,
          "name": "2:45 PM"
        },
        {
          "id": 45,
          "name": "3:00 PM"
        },
        {
          "id": 46,
          "name": "3:15 PM"
        },
        {
          "id": 47,
          "name": "3:30 PM"
        },
        {
          "id": 48,
          "name": "3:45 PM"
        },
        {
          "id": 49,
          "name": "4:00 PM"
        },
        {
          "id": 50,
          "name": "4:15 PM"
        },
        {
          "id": 51,
          "name": "4:30 PM"
        },
        {
          "id": 52,
          "name": "4:45 PM"
        },
        {
          "id": 53,
          "name": "5:00 PM"
        },
        {
          "id": 54,
          "name": "5:15 PM"
        },
        {
          "id": 55,
          "name": "5:30 PM"
        },
        {
          "id": 56,
          "name": "5:45 PM"
        },
        {
          "id": 57,
          "name": "6:00 PM"
        },
        {
          "id": 58,
          "name": "6:15 PM"
        },
        {
          "id": 59,
          "name": "6:30 PM"
        },
        {
          "id": 60,
          "name": "6:45 PM"
        },
        {
          "id": 61,
          "name": "7:00 PM"
        },
        {
          "id": 62,
          "name": "7:15 PM"
        },
        {
          "id": 63,
          "name": "7:30 PM"
        },
        {
          "id": 64,
          "name": "7:45 PM"
        },
        {
          "id": 65,
          "name": "8:00 PM"
        },
        {
          "id": 66,
          "name": "8:15 PM"
        },
        {
          "id": 67,
          "name": "8:30 PM"
        },
        {
          "id": 68,
          "name": "8:45 PM"
        },
        {
          "id": 69,
          "name": "9:00 PM"
        },
        {
          "id": 70,
          "name": "9:15 PM"
        },
        {
          "id": 71,
          "name": "9:30 PM"
        },
        {
          "id": 72,
          "name": "9:45 PM"
        },
        {
          "id": 73,
          "name": "10:00 PM"
        },
        {
          "id": 74,
          "name": "10:15 PM"
        },
        {
          "id": 75,
          "name": "10:30 PM"
        },
        {
          "id": 76,
          "name": "10:45 PM"
        },
        {
          "id": 77,
          "name": "11:00 PM"
        },
        {
          "id": 78,
          "name": "11:15 PM"
        },
        {
          "id": 79,
          "name": "11:30 PM"
        },
        {
          "id": 80,
          "name": "11:45 PM"
        },
        {
          "id": 81,
          "name": "12:00 AM"
        },
        {
          "id": 82,
          "name": "12:15 AM"
        },
        {
          "id": 83,
          "name": "12:30 AM"
        },
        {
          "id": 84,
          "name": "12:45 AM"
        },
        {
          "id": 85,
          "name": "1:00 AM"
        },
        {
          "id": 86,
          "name": "1:15 AM"
        },
        {
          "id": 87,
          "name": "1:30 AM"
        },
        {
          "id": 88,
          "name": "1:45 AM"
        },
        {
          "id": 89,
          "name": "2:00 AM"
        },
        {
          "id": 90,
          "name": "2:15 AM"
        },
        {
          "id": 91,
          "name": "2:30 AM"
        },
        {
          "id": 92,
          "name": "2:45 AM"
        },
        {
          "id": 93,
          "name": "3:00 AM"
        },
        {
          "id": 94,
          "name": "3:15 AM"
        },
        {
          "id": 95,
          "name": "3:30 AM"
        },
        {
          "id": 96,
          "name": "3:45 AM"
        }
      ],

    BREAK_TIMES: [
        {
          "id": 0,
          "name": "0 min"
        },
        {
          "id": 1,
          "name": "5 min"
        },
        {
          "id": 2,
          "name": "10 min"
        },
        {
          "id": 3,
          "name": "15 min"
        },
        {
          "id": 4,
          "name": "20 min"
        },
        {
          "id": 5,
          "name": "25 min"
        },
        {
          "id": 6,
          "name": "30 min"
        },
        {
          "id": 7,
          "name": "35 min"
        },
        {
          "id": 8,
          "name": "40 min"
        },
        {
          "id": 9,
          "name": "45 min"
        },
        {
          "id": 10,
          "name": "50 min"
        },
        {
          "id": 11,
          "name": "55 min"
        },
        {
          "id": 12,
          "name": "60 min"
        }
      ],

    POSITIONS_LIST: [
        {
          "id": 0,
          "name": "Bartender",
          "icon": "bi bi-grid",
          "quantity": 1,
          "price":45
        },
        {
          "id": 1,
          "name": "Dishwasher",
          "icon": "bi bi-grid",
          "quantity": 1,
          "price":35
        },
        {
          "id": 2,
          "name": "Event Server",
          "icon": "bi bi-grid",
          "quantity": 1,
          "price":35
        },
        {
          "id": 3,
          "name": "Barback",
          "icon": "bi bi-grid",
          "quantity": 1,
          "price":30
        },
        {
          "id": 4,
          "name": "Busser",
          "icon": "bi bi-grid",
          "quantity": 1,
          "price":30
        },
        {
          "id": 5,
          "name": "Event Setup and Takedown",
          "icon": "bi bi-grid",
          "quantity": 1,
          "price":30
        },
        {
          "id": 6,
          "name": "Prep Cook",
          "icon": "bi bi-grid",
          "quantity": 1,
          "price":30
        },
        {
          "id": 7,
          "name": "Runner",
          "icon": "bi bi-grid",
          "quantity": 1,
          "price":30
        },
        {
          "id": 8,
          "name": "Housekeeper",
          "icon": "bi bi-grid",
          "quantity": 1,
          "price":30
        },
        {
          "id": 9,
          "name": "Counter Staff / Cashier",
          "icon": "bi bi-grid",
          "quantity": 1,
          "price":30
        }
      ],


    /* Instructions Master Data */
    INSTRUCTIONS_LIST: [
        {
          "id": "1",
          "title": "Black Bistro",
          "img": "/assets/img/instructions/1.png",
          "description": [
            {
              "title": "Apparel preset",
              "value": "Black Bistro"
            },
            {
              "title": "Top",
              "value": "Pressed black dress shirt"
            },
            {
              "title": "Bottom",
              "value": "Black slacks"
            },
            {
              "title": "Footwear",
              "value": "Black dress shoes"
            },
            {
              "title": "Accessories",
              "value": "Black belt, Black tie"
            }
          ]
        },
        {
          "id": "2",
          "title": "White Bistro",
          "img": "/assets/img/instructions/2.png",
          "description": [
            {
              "title": "Apparel preset",
              "value": "White Bistro"
            },
            {
              "title": "Top",
              "value": "Pressed white dress shirt"
            },
            {
              "title": "Bottom",
              "value": "Black slacks"
            },
            {
              "title": "Footwear",
              "value": "Black dress shoes"
            },
            {
              "title": "Accessories",
              "value": "Black belt, Black tie"
            }
          ]
        },
        {
          "id": "3",
          "title": "Chef Uniform",
          "img": "/assets/img/instructions/3.png",
          "description": [
            {
              "title": "Apparel preset",
              "value": "Chef Uniform"
            },
            {
              "title": "Top",
              "value": "Chef coat"
            },
            {
              "title": "Bottom",
              "value": "Black Chef Pants"
            },
            {
              "title": "Footwear",
              "value": "Black non-slip shoes"
            },
            {
              "title": "Accessories",
              "value": "No preference"
            }
          ]
        },
        {
          "id": "4",
          "title": "Kitchen Black",
          "img": "/assets/img/instructions/4.png",
          "description": [
            {
              "title": "Apparel preset",
              "value": "Kitchen Black"
            },
            {
              "title": "Top",
              "value": "Black shirt"
            },
            {
              "title": "Bottom",
              "value": "Black pants"
            },
            {
              "title": "Footwear",
              "value": "Black non-slip shoes"
            },
            {
              "title": "Accessories",
              "value": "No preference"
            }
          ]
        },
        {
          "id": "5",
          "title": "Business Casual",
          "img": "/assets/img/instructions/5.png",
          "description": [
            {
              "title": "Apparel preset",
              "value": "Business Casual"
            },
            {
              "title": "Top",
              "value": "Polo / dress shirt"
            },
            {
              "title": "Bottom",
              "value": "Khakis / slacks"
            },
            {
              "title": "Footwear",
              "value": "Black non-slip shoes"
            },
            {
              "title": "Accessories",
              "value": "No preference"
            }
          ]
        },
        {
          "id": "6",
          "title": "No Preference",
          "img": "/assets/img/instructions/6.png",
          "description": [
            {
              "title": "Apparel preset",
              "value": "No Preferencel"
            },
            {
              "title": "Accessories",
              "value": "No preference"
            }
          ]
        }
      ],

    GROOMING_INSTRUCTIONS_LIST: [
        {
          "id": "1",
          "title": "Professional",
          "description": [
            {
              "id": "1",
              "title": "No visible tattoos (tattoos must be covered)"
            },
            {
              "id": "2",
              "title": "No long or dirty fingernails"
            },
            {
              "id": "3",
              "title": "No nail color/paints"
            },
            {
              "id": "4",
              "title": "No loose long hair (long hair must be pulled up)"
            },
            {
              "id": "5",
              "title": "No unpleasant hygiene (use deodorant)"
            },
            {
              "id": "6",
              "title": "No facial tattoos"
            },
            {
              "id": "7",
              "title": "No acrylics or fake nails"
            },
            {
              "id": "8",
              "title": "No heavy jewelry (limited jewelry is okay)"
            },
            {
              "id": "9",
              "title": "No extreme hair colors (e.g., blue)"
            }
          ]
        },
        {
          "id": "2",
          "title": "Standard",
          "description": [
            {
              "id": "1",
              "title": "No long or dirty fingernails"
            },
            {
              "id": "2",
              "title": "No heavy jewelry (limited jewelry is okay)"
            },
            {
              "id": "3",
              "title": "No loose long hair (long hair must be pulled up)"
            },
            {
              "id": "4",
              "title": "No unpleasant hygiene (use deodorant)"
            }
          ]
        },
        {
          "id": "3",
          "title": "No Preference"
        }
      ],

})

