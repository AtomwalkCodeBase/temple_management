const subServiceContent = {
  // strategicLegalAdvisory: {
  //   title: "Strategic & Legal Advisory",
  //   description:
  // 	"At Lifeintelect, our Strategic & Legal Advisory services empower clients to navigate the complex legal, regulatory, and strategic dimensions of intellectual property. From developing robust IP strategies to enforcing rights and monetizing assets, we provide tailored, actionable advice to align with your business objectives. Ready to strengthen your IP strategy with Lifeintelect? Let's get started!",
  //   subServices: {
  // 	ipStrategyDevelopment: {
  // 	  title: "IP Strategy Development",
  // 	  description:
  // 		"At Lifeintelect, we craft comprehensive IP strategies that align with your R&D roadmap, market goals, and long-term vision. We begin by analyzing your business objectives, core innovations, and competitive landscape. Our experts then identify key IP assets, determine the appropriate types of protection (patents, trademarks, copyrights, etc.), and develop filing strategies across jurisdictions. We integrate your IP strategy into your broader business model, ensuring it supports growth, competitiveness, and monetization opportunities.",
  // 	  process: [
  // 		{
  // 		  title: "Business Analysis",
  // 		  description:
  // 			"Understanding your business objectives, R&D roadmap, and market goals to align IP strategy."
  // 		},
  // 		{
  // 		  title: "Innovation Identification",
  // 		  description:
  // 			"Identifying core innovations and potential IP assets within your portfolio."
  // 		},
  // 		{
  // 		  title: "Protection Strategy",
  // 		  description:
  // 			"Determining the right types of IP protection and filing strategies across jurisdictions."
  // 		},
  // 		{
  // 		  title: "Business Integration",
  // 		  description:
  // 			"Integrating the IP strategy into your business model to support growth and monetization."
  // 		},
  // 		{
  // 		  title: "Portfolio Development",
  // 		  description:
  // 			"Building a valuable, defensible, and monetizable IP portfolio tailored to your vision."
  // 		}
  // 	  ],
  // 	  closing:
  // 		"Lifeintelect’s IP Strategy Development service ensures your intellectual property drives business success. Ready to build a robust IP strategy with Lifeintelect? Let's get started!"
  // 	},
  // 	ipLitigationSupport: {
  // 	  title: "IP Litigation & Enforcement Support",
  // 	  description:
  // 		"At Lifeintelect, we provide robust support for enforcing your intellectual property rights through litigation preparedness and strategic guidance. While we do not litigate directly, we collaborate with legal firms to deliver technical and strategic IP support. We start by analyzing potential infringements, assessing the strength of your IP assets, and documenting evidence. Our experts then prepare comprehensive reports and liaise with legal teams to ensure you are fully equipped for enforcement actions or legal disputes.",
  // 	  process: [
  // 		{
  // 		  title: "Infringement Analysis",
  // 		  description:
  // 			"Assessing potential infringements by analyzing your IP assets and competitor activities."
  // 		},
  // 		{
  // 		  title: "Evidence Documentation",
  // 		  description:
  // 			"Compiling detailed evidence to support enforcement actions or litigation."
  // 		},
  // 		{
  // 		  title: "Litigation Preparedness",
  // 		  description:
  // 			"Preparing technical reports and strategic recommendations for legal proceedings."
  // 		},
  // 		{
  // 		  title: "Legal Liaison Support",
  // 		  description:
  // 			"Collaborating with legal firms to ensure seamless communication and strategy alignment."
  // 		}
  // 	  ],
  // 	  closing:
  // 		"Lifeintelect’s IP Litigation & Enforcement Support equips you to protect your IP rights effectively. Ready to enforce your IP with Lifeintelect? Let's get started!"
  // 	},
  // 	licensingIpAgreements: {
  // 	  title: "Licensing & IP Agreements",
  // 	  description:
  // 		"At Lifeintelect, we assist in drafting, reviewing, and negotiating IP-related contracts to ensure your intellectual property is protected and monetized. We begin by understanding your business goals and the scope of the agreement, whether it’s a licensing deal, non-disclosure agreement (NDA), technology transfer, or joint development contract. Our experts then craft or review agreements to safeguard your IP, mitigate risks, and maximize revenue potential, ensuring clear terms and favorable conditions.",
  // 	  process: [
  // 		{
  // 		  title: "Goal Assessment",
  // 		  description:
  // 			"Understanding your business objectives and the scope of the IP agreement."
  // 		},
  // 		{
  // 		  title: "Agreement Drafting",
  // 		  description:
  // 			"Crafting clear, robust contracts, including licensing agreements, NDAs, or technology transfers."
  // 		},
  // 		{
  // 		  title: "Review & Negotiation",
  // 		  description:
  // 			"Reviewing existing agreements and negotiating terms to protect your IP and maximize value."
  // 		},
  // 		{
  // 		  title: "Risk Mitigation",
  // 		  description:
  // 			"Ensuring agreements include provisions to minimize risks and enforce IP rights."
  // 		}
  // 	  ],
  // 	  closing:
  // 		"Lifeintelect’s Licensing & IP Agreements service ensures your IP is protected and monetized effectively. Ready to secure your IP contracts with Lifeintelect? Let's get started!"
  // 	},
  // 	crossBorderIpStrategy: {
  // 	  title: "Cross-Border IP Strategy & Compliance",
  // 	  description:
  // 		"At Lifeintelect, we help clients navigate the complexities of cross-border IP management to protect assets globally. We analyze your international market expansion plans and develop jurisdictional filing strategies to secure IP rights. Our team ensures compliance with regional regulations and treaties, addressing enforcement challenges and cultural nuances. We provide tailored recommendations to safeguard your IP across borders while optimizing costs and strategic alignment.",
  // 	  process: [
  // 		{
  // 		  title: "Market Analysis",
  // 		  description:
  // 			"Assessing your international expansion plans and target markets for IP protection."
  // 		},
  // 		{
  // 		  title: "Jurisdictional Filing Strategy",
  // 		  description:
  // 			"Developing strategies for filing patents, trademarks, and other IP rights across regions."
  // 		},
  // 		{
  // 		  title: "Regulatory Compliance",
  // 		  description:
  // 			"Ensuring compliance with regional IP laws, treaties, and regulatory requirements."
  // 		},
  // 		{
  // 		  title: "Enforcement Planning",
  // 		  description:
  // 			"Addressing cross-border enforcement challenges to protect your IP globally."
  // 		}
  // 	  ],
  // 	  closing:
  // 		"Lifeintelect’s Cross-Border IP Strategy & Compliance service ensures your IP is protected worldwide. Ready to expand your IP globally with Lifeintelect? Let's get started!"
  // 	},
  // 	tradeSecretProtection: {
  // 	  title: "Trade Secret Protection & Confidentiality",
  // 	  description:
  // 		"At Lifeintelect, we design frameworks to protect your trade secrets and confidential business information, especially in tech and scientific sectors. We start by identifying your proprietary knowledge and assessing risks of unauthorized disclosure. Our experts then develop tailored confidentiality policies, non-disclosure agreements (NDAs), and internal control mechanisms to safeguard your trade secrets, ensuring robust protection and compliance with legal standards.",
  // 	  process: [
  // 		{
  // 		  title: "Trade Secret Identification",
  // 		  description:
  // 			"Identifying proprietary knowledge and confidential information critical to your business."
  // 		},
  // 		{
  // 		  title: "Risk Assessment",
  // 		  description:
  // 			"Evaluating risks of unauthorized disclosure or loss of trade secrets."
  // 		},
  // 		{
  // 		  title: "Policy Development",
  // 		  description:
  // 			"Crafting confidentiality policies and NDAs to protect trade secrets."
  // 		},
  // 		{
  // 		  title: "Internal Controls",
  // 		  description:
  // 			"Implementing workflows and training to ensure secure handling of confidential information."
  // 		}
  // 	  ],
  // 	  closing:
  // 		"Lifeintelect’s Trade Secret Protection & Confidentiality service safeguards your most valuable assets. Ready to secure your trade secrets with Lifeintelect? Let's get started!"
  // 	},
  // 	ipExitStrategy: {
  // 	  title: "IP Exit Strategy & Monetization",
  // 	  description:
  // 		"At Lifeintelect, we help you structure your IP portfolio for maximum valuation during acquisitions, investments, or divestments. We assess your IP assets to identify monetization opportunities, such as licensing, assignments, or technology sales. Our experts develop tailored exit strategies, including portfolio optimization and negotiation support, to ensure your IP becomes a tangible asset in exit negotiations, maximizing financial returns.",
  // 	  process: [
  // 		{
  // 		  title: "Portfolio Assessment",
  // 		  description:
  // 			"Evaluating your IP assets to determine their commercial and strategic value."
  // 		},
  // 		{
  // 		  title: "Monetization Opportunities",
  // 		  description:
  // 			"Identifying licensing, assignment, or sale opportunities to maximize IP value."
  // 		},
  // 		{
  // 		  title: "Exit Strategy Development",
  // 		  description:
  // 			"Crafting a tailored strategy for acquisitions, investments, or divestments."
  // 		},
  // 		{
  // 		  title: "Negotiation Support",
  // 		  description:
  // 			"Providing strategic guidance to ensure favorable terms in exit negotiations."
  // 		}
  // 	  ],
  // 	  closing:
  // 		"Lifeintelect’s IP Exit Strategy & Monetization service maximizes the value of your IP in exit scenarios. Ready to monetize your IP with Lifeintelect? Let's get started!"
  // 	},
  // 	corporateIpGovernance: {
  // 	  title: "Corporate IP Governance & Risk Mitigation",
  // 	  description:
  // 		"At Lifeintelect, we integrate IP governance into your corporate compliance frameworks to manage risks effectively. We design internal IP policies, establish ownership protocols, and create workflows for managing innovations across departments. Our risk mitigation strategies include contract reviews, dispute prevention measures, and employee training, ensuring your organization’s intangible assets are protected and aligned with business goals.",
  // 	  process: [
  // 		{
  // 		  title: "Policy Design",
  // 		  description:
  // 			"Developing internal IP policies to govern asset management and compliance."
  // 		},
  // 		{
  // 		  title: "Ownership Protocols",
  // 		  description:
  // 			"Establishing clear protocols for IP ownership across departments."
  // 		},
  // 		{
  // 		  title: "Innovation Workflows",
  // 		  description:
  // 			"Creating processes to identify, protect, and manage innovations organization-wide."
  // 		},
  // 		{
  // 		  title: "Risk Mitigation",
  // 		  description:
  // 			"Implementing strategies to prevent disputes and strengthen IP contracts."
  // 		},
  // 		{
  // 		  title: "Employee Training",
  // 		  description:
  // 			"Training staff on IP governance to foster compliance and innovation."
  // 		}
  // 	  ],
  // 	  closing:
  // 		"Lifeintelect’s Corporate IP Governance & Risk Mitigation service strengthens your IP management framework. Ready to enhance your IP governance with Lifeintelect? Let's get started!"
  // 	},
  // 	patentTrademarkPortfolio: {
  // 	  title: "Patent & Trademark Portfolio Optimization",
  // 	  description:
  // 		"At Lifeintelect, we optimize your patent and trademark portfolios to ensure they are cost-effective and strategically aligned. We review your existing IP assets to assess their relevance, commercial potential, and enforceability. Based on this analysis, we recommend which assets to maintain, consolidate, license, or abandon, streamlining your portfolio to support your business objectives while minimizing unnecessary costs.",
  // 	  process: [
  // 		{
  // 		  title: "Portfolio Review",
  // 		  description:
  // 			"Assessing the relevance, commercial potential, and enforceability of your patents and trademarks."
  // 		},
  // 		{
  // 		  title: "Strategic Analysis",
  // 		  description:
  // 			"Evaluating alignment of IP assets with your business goals and market strategy."
  // 		},
  // 		{
  // 		  title: "Optimization Recommendations",
  // 		  description:
  // 			"Recommending maintenance, consolidation, licensing, or abandonment of assets."
  // 		},
  // 		{
  // 		  title: "Cost Management",
  // 		  description:
  // 			"Streamlining the portfolio to reduce maintenance costs while maximizing value."
  // 		}
  // 	  ],
  // 	  closing:
  // 		"Lifeintelect’s Patent & Trademark Portfolio Optimization service ensures a lean, high-value IP portfolio. Ready to optimize your IP assets with Lifeintelect? Let's get started!"
  // 	},
  // 	governmentPolicyAdvocacy: {
  // 	  title: "Government and Policy Advocacy",
  // 	  description:
  // 		"At Lifeintelect, we support clients in engaging with government bodies and IP regulators to advance their interests. We assist with public IP filings, ensure regulatory compliance, and help position your organization for government grants, schemes, or innovation incentives. Our team also guides you through IP-related legislative changes and supports strategic advocacy to shape favorable policies, ensuring your voice is heard in policy-facing sectors.",
  // 	  closing:
  // 		"Lifeintelect’s Government and Policy Advocacy service amplifies your influence in IP policy and regulation. Ready to engage with policymakers with Lifeintelect? Let's get started!"
  // 	}
  //   }
  // }
  strategicLegalAdvisory: {
    title: "STRATEGY & ADVISORY ",
    subtitle:"Navigate Complexity. Align IP with Business Vision. Protect and Scale with Confidence.",
    description:[
      "Intellectual property is more than a legal asset — it’s a strategic driver of competitive advantage, investment potential, and global scalability. Whether preparing for a product launch, entering a joint venture, or planning an exit, clear, forward-thinking IP advisory ensures every move aligns with long-term business objectives.",
      "LifeIntelect’s technolegal advisory services empower organizations to make informed IP decisions across jurisdictions, industries, and growth stages — with clarity, compliance, and commercial impact built into every recommendation",
    ],
    service_1: {
      title: "IP Strategy Development",
      subtitle:"Design a Roadmap Where Innovation Meets Market Value",
      description:"A clear IP strategy transforms ideas into assets. From identifying core technologies to prioritizing jurisdictions, a tailored strategy enables stronger protection, efficient filings, and maximum monetization. Alignment with R&D and commercial goals ensures your portfolio grows with your business — not ahead or behind it.This creates a future-ready IP blueprint that integrates seamlessly into your business and innovation lifecycle",
        
    //   process: [
    //     {
    //       title: "Business Goal Analysis",
    //       description:
    //         "Understanding your R&D roadmap, market objectives, and long-term vision.",
    //     },
    //     {
    //       title: "Innovation Identification",
    //       description:
    //         "Pinpointing core innovations eligible for IP protection.",
    //     },
    //     {
    //       title: "Protection Strategy",
    //       description:
    //         "Selecting the right IP protection types, such as patents or trademarks.",
    //     },
    //     {
    //       title: "Jurisdictional Planning",
    //       description:
    //         "Defining filing strategies for key markets and jurisdictions.",
    //     },
    //     {
    //       title: "Business Integration",
    //       description:
    //         "Embedding IP strategy into your broader business model for maximum impact.",
    //     },
    //   ],
    //   closing:
    //     "Lifeintelect’s IP Strategy Development service builds a robust IP foundation for your business. Ready to align your IP with your goals with Lifeintelect? Let's get started!",
    },
    service_2: {
      title: "Licensing & IP Agreements",
      subtitle:"Structure Partnerships That Monetize IP and Minimize Risk",
      description:"Licensing deals, Non-Disclosure Agreements (NDAs), technology transfers, and joint development agreements are the foundation of IP commercialization. Precise drafting, due diligence, and negotiation support ensure that your IP remains protected, properly valued, and legally secure across all collaborations.With well-structured contracts, your IP becomes a secure revenue stream and a tool for strategic collaboration.",
    //   subsections: [
    //     {
    //       heading: "Our Support Services",
    //       items: [
    //         {
    //           title: "Infringement Analysis",
    //           description:
    //             "Conducting detailed analyses to identify potential IP infringements.",
    //         },
    //         {
    //           title: "Evidence Documentation",
    //           description:
    //             "Preparing comprehensive evidence to support enforcement actions.",
    //         },
    //         {
    //           title: "Legal Liaison Support",
    //           description:
    //             "Collaborating with legal firms to provide technical and strategic IP insights.",
    //         },
    //         {
    //           title: "Litigation Preparedness",
    //           description:
    //             "Equipping you with strategies and documentation for legal disputes.",
    //         },
    //       ],
    //     },
    //   ],
    },
    service_3: {
      title: "Cross-Border IP Strategy & Compliance",
      subtitle:"Expand Globally with Comprehensive IP Protection",
      description:"As businesses grow internationally, navigating the complexities of jurisdictional IP laws is crucial. A customized cross-border strategy ensures seamless protection across key markets. By managing filing timelines, ensuring treaty compliance, and preparing for regional enforcement, companies can prevent IP erosion abroad. With globally aligned rights, international expansion becomes more secure and efficient, supporting your strategic growth.",
    //   process: [
    //     {
    //       title: "Needs Assessment",
    //       description:
    //         "Understanding your goals for licensing or collaboration.",
    //     },
    //     {
    //       title: "Agreement Drafting",
    //       description:
    //         "Crafting clear, protective IP agreements tailored to your needs.",
    //     },
    //     {
    //       title: "Review and Revision",
    //       description:
    //         "Analyzing existing agreements to ensure IP protection and fairness.",
    //     },
    //     {
    //       title: "Negotiation Support",
    //       description:
    //         "Guiding negotiations to secure favorable terms and mitigate risks.",
    //     },
    //   ],
    //   closing:
    //     "Lifeintelect’s Licensing & IP Agreements service safeguards and monetizes your IP. Ready to structure your IP deals with Lifeintelect? Let's get started!",
    },
    service_4: {
      title: "Trade Secret Protection & Confidentiality",
      subtitle:"Protect Your Proprietary Knowledge Before It’s Exposed",
      description:[
        "Not all valuable IP is registered—much of it lies in what a business knows and how it operates. Strong internal policies, IP control mechanisms, and well-crafted NDAs ensure confidentiality, safeguarding trade secrets from accidental disclosures or competitive leaks.",
        "This strategy guarantees that your vital expertise stays protected, enforceable, and strategically hidden from competitors, keeping your competitive edge secure",
      ],
    //   subsections: [
    //     {
    //       heading: "Our Approach",
    //       items: [
    //         {
    //           title: "Jurisdictional Filing Strategies",
    //           description:
    //             "Planning IP filings across key international markets.",
    //         },
    //         {
    //           title: "Regulatory Compliance",
    //           description:
    //             "Ensuring adherence to regional IP laws and treaties.",
    //         },
    //         {
    //           title: "Enforcement Guidance",
    //           description:
    //             "Advising on enforcement strategies in global jurisdictions.",
    //         },
    //         {
    //           title: "Risk Assessment",
    //           description: "Identifying and mitigating cross-border IP risks.",
    //         },
    //       ],
    //     },
    //   ],
    },
    service_5: {
      title: "IP Exit Strategy & Monetization",
      subtitle:"Maximize IP Value During Investment, Acquisition, or Licensing",
      description:"Whether preparing for acquisition, investment, or divestment, a well-structured IP exit strategy maximizes valuation and leverage. By organizing portfolios, clarifying rights, and identifying licensing opportunities, businesses can unlock monetization pathways such as spin-offs, assignments, and technology sales. This approach ensures your IP becomes a valuable asset, strengthening your position in exit negotiations",
    //   process: [
    //     {
    //       title: "Trade Secret Identification",
    //       description:
    //         "Pinpointing confidential information eligible for trade secret protection.",
    //     },
    //     {
    //       title: "Policy Development",
    //       description:
    //         "Drafting confidentiality policies and NDAs to secure trade secrets.",
    //     },
    //     {
    //       title: "Internal Controls",
    //       description:
    //         "Implementing mechanisms to protect proprietary knowledge.",
    //     },
    //     {
    //       title: "Training and Compliance",
    //       description:
    //         "Educating staff on trade secret protection and compliance.",
    //     },
    //   ],
    //   closing:
    //     "Lifeintelect’s Trade Secret Protection service secures your confidential assets. Ready to protect your trade secrets with Lifeintelect? Let's get started!",
    },
    service_6: {
      title: "Corporate IP Governance & Risk Mitigation",
      subtitle:"Embed IP into Organizational DNA and Prevent Future Disputes",
      description:[
        "Strong governance is key to protecting innovation and managing risk effectively. By clarifying ownership, managing disclosures, and standardizing contracts, businesses can reduce exposure to disputes and ensure compliance. Internal workflows across departments guarantee that IP is consistently captured, protected, and managed.",
        "With robust internal systems and well-designed policies in place, organizations can significantly reduce risk, strengthen their legal position, and protect their intangible assets across all departments, ensuring long-term success and security.",
      ],
    //   subsections: [
    //     {
    //       heading: "Our Services",
    //       items: [
    //         {
    //           title: "Portfolio Valuation",
    //           description:
    //             "Assessing and structuring your IP for maximum valuation.",
    //         },
    //         {
    //           title: "Licensing Opportunities",
    //           description:
    //             "Identifying potential licensing or partnership deals.",
    //         },
    //         {
    //           title: "Monetization Pathways",
    //           description:
    //             "Developing strategies for assignments, spin-offs, or sales.",
    //         },
    //         {
    //           title: "Negotiation Support",
    //           description: "Advising on IP terms during exit negotiations.",
    //         },
    //       ],
    //     },
    //   ],
    },
    service_7: {
      title: "Patent & Trademark Portfolio Optimization",
      subtitle:"Trim Costs. Focus on Value. Strengthen Strategic Positioning.",
      description:[
        "Not all IP assets drive growth equally. A comprehensive portfolio review helps identify high-value assets, as well as redundant or obsolete filings. The outcome is a streamlined portfolio that aligns with market trends, competitive challenges, and business objectives.",
        "This approach enables you to focus resources on what truly matters, ensuring greater returns on your IP investments.",
      ],
    //   subsections: [
    //     {
    //       heading: "Our Process",
    //       items: [
    //         {
    //           title: "Policy Design",
    //           description:
    //             "Creating internal IP policies for consistent management.",
    //         },
    //         {
    //           title: "Ownership Protocols",
    //           description:
    //             "Establishing clear IP ownership rules across departments.",
    //         },
    //         {
    //           title: "Innovation Workflows",
    //           description:
    //             "Setting up processes for capturing and protecting innovations.",
    //         },
    //         {
    //           title: "Risk Mitigation",
    //           description:
    //             "Implementing strategies to prevent IP disputes and losses.",
    //         },
    //       ],
    //     },
    //   ],
    },
    service_8: {
      title: "IP Litigation & Enforcement Support",
      subtitle:"Be Ready to Defend Your Rights — Strategically and Legally",
      description:"When IP infringement or disputes arise, thorough preparation is the key. With expert infringement analysis, strategic advisory, and litigation support, businesses can ensure their claims are robust, well-documented, and aligned with legal counsel, strengthening enforcement strategies whether in court or during settlement negotiations.",
    //   process: [
    //     {
    //       title: "Portfolio Review",
    //       description:
    //         "Analyzing patents and trademarks for relevance and enforceability.",
    //     },
    //     {
    //       title: "Commercial Assessment",
    //       description: "Evaluating the commercial potential of each IP asset.",
    //     },
    //     {
    //       title: "Optimization Recommendations",
    //       description:
    //         "Advising on maintenance, consolidation, licensing, or abandonment.",
    //     },
    //     {
    //       title: "Implementation Support",
    //       description:
    //         "Assisting in executing portfolio optimization strategies.",
    //     },
    //   ],
    //   closing:
    //     "Lifeintelect’s Patent & Trademark Portfolio Optimization service streamlines your IP assets. Ready to optimize your portfolio with Lifeintelect? Let's get started!",
    },
    // service_9: {
    //   title: "Government and Policy Advocacy",
    //   description:
    //     "For clients involved in policy-facing sectors or working with public institutions, we offer support in engaging with government bodies and IP regulators. This includes assistance with public IP filings, regulatory compliance, and positioning for government grants, schemes, or innovation incentives. We also help organizations navigate IP-related legislative changes and participate in shaping policy through strategic advocacy.",
    //   subsections: [
    //     {
    //       heading: "Our Support",
    //       items: [
    //         {
    //           title: "Public IP Filings",
    //           description:
    //             "Assisting with IP filings for government-related projects.",
    //         },
    //         {
    //           title: "Regulatory Compliance",
    //           description:
    //             "Ensuring compliance with government IP regulations.",
    //         },
    //         {
    //           title: "Grant Positioning",
    //           description:
    //             "Positioning clients for government grants and incentives.",
    //         },
    //         {
    //           title: "Policy Advocacy",
    //           description:
    //             "Engaging in advocacy to shape favorable IP legislation.",
    //         },
    //       ],
    //     },
    //   ],
    // },
  },
};

export default subServiceContent;
