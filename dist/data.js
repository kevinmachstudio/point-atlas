"use strict";

const sources = {
  marriottAwards: ["Marriott award bookings and certificates", "https://help.marriott.com/s/article/book-with-marriott-bonvoy-points"],
  marriottFive: ["Marriott Stay for 5, Pay for 4", "https://help.marriott.com/s/article/stay-for-5-pay-for-4-benefit"],
  southwestAwards: ["Southwest reward flights", "https://www.southwest.com/rapid-rewards/points/how-to-redeem/"],
  southwestCalendar: ["Southwest Low Fare Calendar", "https://www.southwest.com/air/low-fare-calendar/"],
  southwestSanDiego: ["Southwest SFO–SAN fares", "https://www.southwest.com/en/flights/flights-from-san-francisco-to-san-diego"],
  southwestVegas: ["Las Vegas sale screenshot", "https://upgradedpoints.com/news/southwest-fare-sale/"],
  southwestSale: ["November Southwest award sale searches", "https://travel-on-points.com/southwest-award-sale-2/"],
  southwestPass: ["Southwest Companion Pass rules for 2026", "https://www.southwest.com/rapid-rewards/tiers/companion-pass"],
  southwest2027: ["Southwest 2027 Companion Pass changes", "https://www.southwest.com/rapid-rewards/2027/companion-pass-changes"],
  southwestFAQ: ["Southwest 2027 transition FAQ", "https://www.southwest.com/rapid-rewards/2027/help/"],
  unitedAwards: ["United MileagePlus award search", "https://www.united.com/en/us/book-flight/united-award-travel"],
  unitedHonolulu: ["AwardTool SFO–HNL tracking", "https://www.awardtool.com/award-flights/san-francisco-sfo-to-honolulu-hnl/united-mileageplus"],
  aaAwards: ["American-operated flight awards", "https://www.aa.com/web/i18n/aadvantage-program/use-miles/american-airlines-flights.html"],
  aaDeals: ["American’s award deals board", "https://www.aa.com/en-us/miles-deals"],
  aaTokyo: ["American’s Tokyo award listing", "https://www.aa.com/en-us/miles-deals?c=EML%7C%7C20261109%7CMKT%7CUSPFMOC%7CBOOK%7C%7CUS_ROUTE_TRAN_MAXMILES_CTA"],
  aaFAQ: ["American award booking FAQ", "https://www.aa.com/web/i18n/aadvantage-program/answers-support/aadvantage-faq.html"],
  aaPartners: ["American partner award chart", "https://www.aa.com/pubcontent/en_US/aadvantage-program/use-miles/partner-airline-flights.html"],
  chaseTransfers: ["Chase transfer rules", "https://www.chase.com/personal/credit-cards/education/basics/how-to-transfer-chase-ultimate-rewards-points"],
  sapphire: ["Chase Sapphire Preferred terms", "https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred"],
  sapphireRates: ["Chase Sapphire Preferred transfer ratios", "https://www.chase.com/sapphire-cards/personal/preferred"],
  strata: ["Citi Strata Premier terms", "https://www.citi.com/credit-cards/citi-strata-premier-credit-card"],
  citiTransfers: ["Citi ThankYou transfer partners", "https://www.thankyou.com/partnerProgramsListing.htm"],
  boundless: ["Marriott Boundless terms", "https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless"],
  southwestPlus: ["Southwest Rapid Rewards Plus terms", "https://creditcards.chase.com/southwest/plus-credit-card"],
  explorer: ["United Explorer terms", "https://creditcards.chase.com/travel-credit-cards/united/united-explorer"],
  platinum: ["Citi / AAdvantage Platinum Select terms", "https://www.citi.com/credit-cards/citi-aadvantage-platinum-select-world-elite-mastercard"],
  platinumBenefits: ["Citi / AAdvantage Platinum Select benefits", "https://citicards.citi.com/hc/dwk-pdfs/Platinum-Benefits-Overview.pdf"],
  googleTiming: ["Google Flights 2026 airfare study", "https://blog.google/products-and-platforms/products/search/holiday-travel-trends-2026/"],
  flights: ["Search and track fares on Google Flights", "https://www.google.com/travel/flights"],
  japan: ["Japan National Tourism Organization fall guide", "https://www.japan.travel/en/guide/autumn-guide/"],
  maui: ["Go Hawaiʻi Maui travel guide", "https://www.gohawaii.com/islands/maui"],
  portugal: ["Visit Portugal’s Lisbon city guide", "https://www.visitportugal.com/sites/default/files/LisboaCityBreaks_EN.pdf"],
  flyingBlue: ["Flying Blue award tickets and monthly promos", "https://www.flyingblue.com/en/earn-spend/flights/rewards"]
};

const programs = [
  {
    id: "marriott", name: "Marriott Bonvoy", type: "hotel", icon: "hotel", target: .75,
    summary: "Five-night hotel stays and anniversary certificates.",
    earn: "Earn on eligible paid Marriott stays or with a Marriott card. Chase Sapphire Preferred transfers 1:1. Compare the Marriott redemption with your other Chase options before sending points.",
    steps: [
      "On Marriott, switch on Use Points/Awards and compare equivalent standard rooms, cancellation terms, and any resort or destination fees.",
      "Check a five-night block. For eligible consecutive nights booked on points under one reservation, Marriott waives the lowest-priced night. Certificates and Cash + Points awards are excluded from that benefit.",
      "Use a Free Night Award when the certificate covers most of the price. Eligible certificates can be topped off with up to 25,000 Bonvoy points. Check the certificate’s expiration and the stay’s fee and cancellation terms."
    ],
    example: "At 30,000 points each night, five eligible nights cost 120,000 points. An equivalent $1,100 cash stay with $100 still owed on the award yields 0.83¢ per point.",
    quote: {cash: 1100, points: 120000, fees: 100}, links: ["marriottFive", "marriottAwards", "sapphireRates", "boundless"]
  },
  {
    id: "southwest", name: "Southwest Rapid Rewards", type: "airline", icon: "plane", target: 1.25,
    summary: "Domestic and Hawaiʻi flights, especially when traveling with a companion.",
    earn: "Earn on qualifying Southwest fares or with a Rapid Rewards card. Chase Sapphire Preferred transfers redeemable points at 1:1. Use Southwest’s qualification rules to track your progress toward Companion Pass.",
    steps: [
      "Search your route in points and dollars. On short hops like SFO to San Diego, try the Low Fare Calendar during an award sale and compare baggage and seat costs for the fare you’d really book.",
      "With an eligible Companion Pass, book your own cash or points ticket first, then add your designated companion. The companion pays applicable taxes and fees, from $5.60 one-way.",
      "Through December 31, 2026, unlimited Companion Pass takes 135,000 qualifying points or 100 qualifying flights. A pass earned under those rules in 2026 runs through December 31, 2027.",
      "Starting January 1, 2027, get three companion trips at 95,000 Tier Qualifying Points or 75 qualifying flights. Unlimited companion trips require Platinum at 140,000 TQPs or 100 qualifying flights. Check the transition FAQ for any offer-specific exceptions."
    ],
    example: "An illustrative one-way U.S. flight at $165 cash or 11,000 points plus $5.60 yields 1.45¢ per point.",
    quote: {cash: 165, points: 11000, fees: 5.6}, links: ["southwestAwards", "southwestCalendar", "southwestPass", "southwest2027", "southwestFAQ", "sapphireRates"]
  },
  {
    id: "united", name: "United MileagePlus", type: "airline", icon: "globe", target: 1.30,
    summary: "United and Star Alliance awards with flexible routing.",
    earn: "Earn on eligible flights or with a United card. Chase Sapphire Preferred transfers 1:1. A United card can make sense if you use eligible bag benefits and award discounts.",
    steps: [
      "Sign in on United and select Book with miles. Check one-way awards separately and try nearby hubs and a few dates on either side.",
      "Compare United and partner flights. Look at the cabin on the longest leg of a mixed-cabin itinerary and compare the actual taxes and fees before booking.",
      "Eligible Explorer cardholders can generally book eligible United or United Express award flights for at least 10% fewer miles than the base award price. Premier members with an eligible card can receive at least 15% off."
    ],
    example: "An illustrative domestic round trip at $320 cash or 20,000 miles plus $11.20 yields 1.54¢ per mile.",
    quote: {cash: 320, points: 20000, fees: 11.2}, links: ["unitedAwards", "explorer", "sapphireRates"]
  },
  {
    id: "american", name: "American AAdvantage", type: "airline", icon: "ticket", target: 1.40,
    summary: "American flight awards and partners like Japan Airlines.",
    earn: "Earn on eligible American and partner travel, through a Citi / AAdvantage card, or through eligible Citi ThankYou transfers. Check your account’s current partner ratio before transferring.",
    steps: [
      "Search one-way awards on AA.com up to 331 days out. American advertises select awards from 7,500 miles one-way, plus taxes and fees. Cash and mileage prices can change by date and flight.",
      "Check the separate partner award chart and look for Japan Airlines, Iberia, or other partner seats. Use the right origin region and cabin and inspect the operating carrier and cash surcharges.",
      "Compare airports and departure dates. Try searching for one seat first to understand availability, then confirm all seats needed before paying or transferring points."
    ],
    example: "An illustrative domestic ticket at $200 cash or 12,500 miles plus $5.60 yields 1.56¢ per mile.",
    quote: {cash: 200, points: 12500, fees: 5.6}, links: ["aaAwards", "aaPartners", "aaFAQ", "strata", "platinum"]
  }
];

const flightExamples = [
  {
    id: "sfo-san", from: "SFO", to: "SAN", title: "San Francisco to San Diego",
    program: "southwest", basis: "Sale target", approximatePoints: true, estimatedFees: true,
    quote: {cash: 59, points: 3000, fees: 5.60},
    observation: "Southwest listed $59 Basic fares on this route. Use about 3,000 points as a sale target. Recent Southwest sale searches found that price on some domestic routes.",
    search: "Switch the Low Fare Calendar to points. Try Tuesday or Wednesday, check OAK and SJC if convenient, and price the return separately.",
    links: ["southwestSanDiego", "southwestSale"], booking: "southwestCalendar"
  },
  {
    id: "las-sfo", from: "LAS", to: "SFO", title: "Las Vegas to San Francisco",
    program: "southwest", basis: "Past sale", estimatedFees: true,
    quote: {cash: 85, points: 5500, fees: 5.60},
    observation: "Upgraded Points captured a 5,500-point fare in Southwest’s September 2026 sale. The cash fee here is an estimate.",
    search: "Check weekday departures and compare with Sunday return prices. Review fare restrictions if your plans may change.",
    links: ["southwestVegas"], booking: "southwestCalendar"
  },
  {
    id: "sfo-hnl", from: "SFO", to: "HNL", title: "San Francisco to Honolulu",
    program: "united", basis: "Tracked award",
    quote: {cash: 325, points: 22500, fees: 5.60},
    observation: "AwardTool saw this MileagePlus price on Nov 10, 2026, for a Nov 16 departure. It tracked nonstop economy from 22,800 miles.",
    search: "Sign in to United and search flexible dates in miles. Toggle nonstop and check eligible cardholder pricing before deciding.",
    links: ["unitedHonolulu"], booking: "unitedAwards"
  },
  {
    id: "lax-jfk", from: "LAX", to: "JFK", title: "Los Angeles to New York",
    program: "american", basis: "Airline listing",
    quote: {cash: 170, points: 7500, fees: 6},
    observation: "American listed this award for a Dec 31, 2026 departure. Check the date on your return separately.",
    search: "Search AA’s one-way mileage calendar and compare JFK with Newark if the airport and ground costs work for you.",
    links: ["aaDeals"], booking: "aaDeals"
  },
  {
    id: "dfw-cdg", from: "DFW", to: "CDG", title: "Dallas to Paris",
    program: "american", basis: "Airline listing",
    quote: {cash: 425, points: 21000, fees: 6},
    observation: "American listed this award for a Jul 22, 2027 departure. The return may have a different mileage price and higher taxes.",
    search: "Compare nonstop and connecting options in AA’s calendar. Check the return and each itinerary’s fees before booking either direction.",
    links: ["aaDeals"], booking: "aaDeals"
  },
  {
    id: "sfo-hnd", from: "SFO", to: "HND", title: "San Francisco to Tokyo",
    program: "american", basis: "Airline listing",
    quote: {cash: 720, points: 35000, fees: 6},
    observation: "American listed this Haneda award for an Oct 7, 2027 departure.",
    search: "Search both Haneda and Narita. Check the operating airline, connection, and baggage, and confirm every seat before transferring.",
    links: ["aaTokyo"], booking: "aaDeals"
  }
];

const creditCards = [
  {
    id: "sapphire", name: "Chase Sapphire Preferred", kind: "flexible", fee: "$95 annual fee",
    summary: "One flexible card for Southwest, United, and Marriott top-ups.",
    fit: "Check if you book across several programs or want to keep points flexible until a trip is ready.",
    perks: "Transfer to Southwest, United, and Marriott at 1:1. Hyatt is 4:3 on Sapphire Preferred, so 12,000 Hyatt points would require 16,000 Chase points at that ratio.",
    terms: "The issuer showed 75,000 points after $5,000 in eligible purchases in the first three months when reviewed. Check your current offer and eligibility.",
    links: ["sapphire", "sapphireRates", "chaseTransfers"]
  },
  {
    id: "strata", name: "Citi Strata Premier", kind: "flexible", fee: "$95 annual fee",
    summary: "A flexible way to earn Citi ThankYou points for eligible transfers.",
    fit: "Compare this with a co-branded card if AAdvantage awards are a priority and you also want access to other Citi travel partners.",
    perks: "Earn 3 ThankYou points per dollar on qualifying air travel, other hotel purchases, restaurants, supermarkets, and gas and EV charging. Citi lists American Airlines as a transfer partner, with a 1,000-point minimum. Confirm your account’s ratio before transferring.",
    terms: "Check the issuer’s current welcome bonus, qualifying spend, time limit, and eligibility before applying.",
    links: ["strata", "citiTransfers"]
  },
  {
    id: "boundless", name: "Marriott Bonvoy Boundless", kind: "brand", fee: "$95 annual fee",
    summary: "An anniversary hotel certificate and 15 Elite Night Credits.",
    fit: "Check whether your regular Marriott properties have standard award nights you can use before the certificate expires.",
    perks: "The annual anniversary Free Night Award covers up to 35,000 points. An eligible 45,000-point room could use the certificate plus 10,000 points. Property fees may still apply.",
    terms: "Welcome offers vary by page. Check the issuer for the current bonus, including whether it consists of points or separate certificates.",
    links: ["boundless", "marriottAwards"]
  },
  {
    id: "southwestPlus", name: "Southwest Rapid Rewards Plus", kind: "brand", fee: "$99 annual fee",
    summary: "A first checked bag perk and 3,000 points on each card anniversary.",
    fit: "Consider it if Southwest serves your regular routes and you use the bag benefit or can earn companion trips under the applicable rules.",
    perks: "Earn 2 Rapid Rewards points per dollar on eligible Southwest purchases. Southwest’s 2027 rules include a Tier Qualifying Point for every eligible dollar spent on Rapid Rewards credit cards.",
    terms: "Check the current bonus and eligibility. The December 2026 transition has offer-specific exceptions described in Southwest’s FAQ.",
    links: ["southwestPlus", "southwest2027", "southwestFAQ"]
  },
  {
    id: "explorer", name: "United Explorer", kind: "brand", fee: "$0 first year, then $150",
    summary: "Eligible bag benefits and lower United award prices.",
    fit: "Consider it if you regularly book on United and can use the checked bag benefit or the two annual one-time United Club passes.",
    perks: "Eligible primary cardmembers get at least 10% off eligible United and United Express mileage awards. Paying for the ticket with the card and attaching the MileagePlus number are generally required for the first checked bag benefit, subject to issuer terms.",
    terms: "Check the current offer for each spending requirement and deadline.",
    links: ["explorer"]
  },
  {
    id: "platinum", name: "Citi / AAdvantage Platinum Select", kind: "brand", fee: "$0 first year, then $99",
    summary: "Direct AAdvantage earning and a domestic checked bag perk.",
    fit: "Consider it if you fly American domestically and can use the checked bag benefit for yourself and eligible companions on the same reservation.",
    perks: "Earn 2 AAdvantage miles per dollar on eligible American Airlines purchases and at restaurants and gas stations.",
    terms: "Verify the welcome offer, eligibility, and eligible itinerary rules on the issuer page.",
    links: ["platinum", "platinumBenefits"]
  }
];

const destinations = [
  {
    id: "tokyo", name: "Tokyo, Japan", season: "OCTOBER – NOVEMBER", photo: "tokyo.jpg", alt: "A Tokyo alley with red lanterns at blue hour",
    summary: "Search Japan Airlines through American, then compare United and its partners.",
    strategy: "Look at both Haneda (HND) and Narita (NRT), alternate U.S. gateways, and one-way awards. Try fall dates for cooler weather and foliage, and search premium cabins as soon as seats appear. Keep a flexible cash fallback.",
    program: "american", quote: {cash: 830, points: 45000, fees: 48},
    example: "Compare an $830 cash fare with an illustrative 45,000 miles + $48 one-way award. Use the partner chart and live search to replace these figures.",
    links: ["japan", "aaPartners", "unitedAwards"]
  },
  {
    id: "maui", name: "Maui, Hawaiʻi", season: "APRIL – MAY / SEPTEMBER – OCTOBER", photo: "maui.jpg", alt: "A palm tree and a golden Hawaiian coastline",
    summary: "Price a Southwest flight into Kahului, then look for five Marriott nights.",
    strategy: "Compare mainland gateways to Kahului (OGG). For the hotel, search eligible five-night blocks and check resort fees, parking, and cancellation terms. Use an existing Companion Pass if your itinerary qualifies.",
    program: "marriott", quote: {cash: 1600, points: 140000, fees: 200},
    example: "Five eligible 35,000-point nights total 140,000 points after Stay for 5, Pay for 4. This is sample math. Check the property's current cash rates and any fees.",
    links: ["maui", "southwestAwards", "marriottFive"]
  },
  {
    id: "lisbon", name: "Lisbon, Portugal", season: "MAY / SEPTEMBER – OCTOBER", photo: "lisbon.jpg", alt: "A yellow tram on a sunlit Lisbon street",
    summary: "Compare United or Flying Blue awards with cash fares for the same cabin.",
    strategy: "Check Lisbon (LIS) with nonstop and one-stop options. Flying Blue releases monthly Promo Rewards on the first day of the month. Check fees, baggage, and refund terms, particularly for Light awards. Try spring and early fall dates.",
    program: "united", quote: {cash: 540, points: 40000, fees: 45},
    example: "Compare a $540 cash fare with an illustrative 40,000 miles + $45 one-way award. Replace the inputs with live prices for your itinerary.",
    links: ["portugal", "flyingBlue", "unitedAwards", "googleTiming"]
  }
];

const timelines = [
  {id: "domestic", label: "U.S. domestic", cash: [22, 57], award: [60, 120], tip: "Try a midweek departure and price both one-ways."},
  {id: "international", label: "International", cash: [50, 133], award: [180, 330], tip: "Start with flexible dates for limited premium seats and check fees by program."},
  {id: "thanksgiving", label: "Thanksgiving", cash: [21, 57], award: [120, 240], tip: "Test an earlier departure or a later return when your plans allow."},
  {id: "christmas", label: "Christmas / winter break", cash: [33, 67], award: [150, 270], tip: "Search awards early for fixed dates and check adjacent travel days."},
  {id: "spring", label: "Spring break", cash: [29, 64], award: [90, 180], tip: "Compare school-break dates across nearby airports."},
  {id: "summer", label: "Summer vacation", cash: [20, 47], award: [90, 210], tip: "Price international summer trips against the international window."},
  {id: "europe", label: "Europe", cash: [49], award: [180, 330], tip: "Compare alternate gateways and count any positioning trip in the total."},
  {id: "mexico", label: "Mexico / Caribbean", cash: [24, 69], award: [90, 210], tip: "Compare shoulder-season dates against school holidays and check resort fees."}
];

const referenceGroups = [
  ["Airline & hotel programs", ["marriottAwards", "marriottFive", "southwestAwards", "southwestPass", "southwest2027", "southwestFAQ", "unitedAwards", "aaAwards", "aaPartners", "aaFAQ"]],
  ["Card terms & transfers", ["chaseTransfers", "sapphire", "sapphireRates", "strata", "citiTransfers", "boundless", "southwestPlus", "explorer", "platinum", "platinumBenefits"]],
  ["Fare research & destinations", ["googleTiming", "flights", "japan", "maui", "portugal", "flyingBlue"]],
  ["Flight sample sources", ["southwestCalendar", "southwestSanDiego", "southwestSale", "southwestVegas", "unitedHonolulu", "aaDeals", "aaTokyo"]]
];
