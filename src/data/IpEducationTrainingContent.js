const subServiceContent = {
	// ipEducationTraining: {
	//   title: "IP Education & Training",
	//   description:
	// 	"At Lifeintelect, our IP Education & Training programs empower startups, R&D teams, corporates, and academic institutions with the knowledge and skills to protect, manage, and commercialize intellectual property. From foundational workshops to advanced strategic training, we deliver tailored learning experiences to drive innovation and business success. Ready to enhance your IP expertise with Lifeintelect? Let's get started!",
	//   subServices: {
	// 	customIpWorkshops: {
	// 	  title: "Custom IP Workshops for Teams",
	// 	  description:
	// 		"At Lifeintelect, we design and deliver customized IP workshops tailored to your team’s specific needs, whether for R&D professionals, legal departments, management, or innovation units. We assess your organization’s IP challenges and goals to create interactive sessions that cover core IP concepts, industry-specific scenarios, and real-world case studies, enabling informed decision-making for innovation and IP protection.",
	// 	  process: [
	// 		{
	// 		  title: "Needs Assessment",
	// 		  description:
	// 			"Analyzing your team’s IP challenges and organizational goals."
	// 		},
	// 		{
	// 		  title: "Content Customization",
	// 		  description:
	// 			"Designing workshop content to address specific IP needs and scenarios."
	// 		},
	// 		{
	// 		  title: "Interactive Delivery",
	// 		  description:
	// 			"Delivering engaging sessions with case studies and practical exercises."
	// 		},
	// 		{
	// 		  title: "Actionable Takeaways",
	// 		  description:
	// 			"Providing tools and strategies for immediate application in IP management."
	// 		}
	// 	  ],
	// 	  closing:
	// 		"Lifeintelect’s Custom IP Workshops empower your team to make strategic IP decisions. Ready to train your team with Lifeintelect? Let's get started!"
	// 	},
	// 	ipFundamentalsStartups: {
	// 	  title: "IP Fundamentals for Startups and Entrepreneurs",
	// 	  description:
	// 		"At Lifeintelect, we offer beginner-friendly training to introduce startups and entrepreneurs to key IP concepts, including patents, trademarks, copyrights, trade secrets, and filing strategies. We explain how IP integrates into their business model and provide practical tools to identify and protect innovations from the early stages, helping startups avoid missed opportunities.",
	// 	  process: [
	// 		{
	// 		  title: "IP Basics Introduction",
	// 		  description:
	// 			"Covering foundational concepts like patents, trademarks, and trade secrets."
	// 		},
	// 		{
	// 		  title: "Business Integration",
	// 		  description:
	// 			"Explaining how IP aligns with startup business models and goals."
	// 		},
	// 		{
	// 		  title: "Innovation Identification",
	// 		  description:
	// 			"Teaching entrepreneurs to recognize protectable innovations."
	// 		},
	// 		{
	// 		  title: "Protection Strategies",
	// 		  description:
	// 			"Providing guidance on cost-effective filing and protection methods."
	// 		}
	// 	  ],
	// 	  closing:
	// 		"Lifeintelect’s IP Fundamentals training equips startups with the knowledge to protect their innovations. Ready to master IP basics with Lifeintelect? Let's get started!"
	// 	},
	// 	ipLawPolicyUpdates: {
	// 	  title: "IP Law & Policy Updates",
	// 	  description:
	// 		"At Lifeintelect, we keep clients informed about the latest developments in national and international IP law, treaties, and policy changes. Our expert-led sessions provide legal teams, innovators, and decision-makers with insights into legislative shifts and global IP trends, ensuring compliance and enabling strategic adjustments to protect and leverage IP assets.",
	// 	  closing:
	// 		"Lifeintelect’s IP Law & Policy Updates keep you ahead of regulatory changes. Ready to stay compliant with Lifeintelect? Let's get started!"
	// 	},
	// 	ipManagementPractices: {
	// 	  title: "IP Management Best Practices",
	// 	  description:
	// 		"At Lifeintelect, we train clients on establishing robust IP management processes, including invention disclosure, IP documentation, deadline tracking, renewals, budgeting, and portfolio analysis. Our sessions are designed for in-house IP teams, innovation managers, and SMEs, helping them build professional frameworks to streamline IP operations and maximize asset value.",
	// 	  process: [
	// 		{
	// 		  title: "Process Design",
	// 		  description:
	// 			"Creating workflows for invention disclosure and IP documentation."
	// 		},
	// 		{
	// 		  title: "Deadline Management",
	// 		  description:
	// 			"Setting up systems to track filing and renewal deadlines."
	// 		},
	// 		{
	// 		  title: "Budget Planning",
	// 		  description:
	// 			"Advising on budgeting strategies for IP protection and maintenance."
	// 		},
	// 		{
	// 		  title: "Portfolio Analysis",
	// 		  description:
	// 			"Training on analyzing and optimizing IP portfolios for strategic value."
	// 		}
	// 	  ],
	// 	  closing:
	// 		"Lifeintelect’s IP Management Best Practices training strengthens your IP operations. Ready to streamline your IP management with Lifeintelect? Let's get started!"
	// 	},
	// 	ipStrategyProductDevelopment: {
	// 	  title: "IP Strategy for Product Development",
	// 	  description:
	// 		"At Lifeintelect, we train product managers, engineers, and developers to integrate IP into the product development cycle. Our sessions cover patent landscaping, identifying protectable features, timing of filings, and competitive positioning through IP, helping teams align their innovation roadmap with a strategic IP framework for a competitive edge.",
	// 	  process: [
	// 		{
	// 		  title: "Patent Landscaping",
	// 		  description:
	// 			"Teaching teams to analyze patents to identify opportunities and risks."
	// 		},
	// 		{
	// 		  title: "Feature Identification",
	// 		  description:
	// 			"Guiding teams to recognize protectable features in product designs."
	// 		},
	// 		{
	// 		  title: "Filing Timing",
	// 		  description:
	// 			"Advising on optimal timing for IP filings during development."
	// 		},
	// 		{
	// 		  title: "Competitive Positioning",
	// 		  description:
	// 			"Using IP to strengthen market position and differentiation."
	// 		}
	// 	  ],
	// 	  closing:
	// 		"Lifeintelect’s IP Strategy for Product Development training enhances your innovation roadmap. Ready to align IP with product development with Lifeintelect? Let's get started!"
	// 	},
	// 	ipCommercializationLicensing: {
	// 	  title: "IP Commercialization & Licensing Training",
	// 	  description:
	// 		"At Lifeintelect, we provide focused training on monetizing IP through licensing and commercialization. We cover valuation basics, licensing strategies, negotiation tactics, and structuring royalty and licensing agreements, equipping startups, business development teams, and tech transfer offices to maximize the commercial value of their innovations.",
	// 	  process: [
	// 		{
	// 		  title: "Valuation Basics",
	// 		  description:
	// 			"Understanding methods to assess the value of IP assets."
	// 		},
	// 		{
	// 		  title: "Licensing Strategies",
	// 		  description:
	// 			"Exploring approaches to structure effective licensing agreements."
	// 		},
	// 		{
	// 		  title: "Negotiation Tactics",
	// 		  description:
	// 			"Learning techniques to secure favorable licensing terms."
	// 		},
	// 		{
	// 		  title: "Agreement Structuring",
	// 		  description:
	// 			"Drafting royalty and licensing agreements to protect interests."
	// 		}
	// 	  ],
	// 	  closing:
	// 		"Lifeintelect’s IP Commercialization & Licensing training unlocks the value of your IP. Ready to monetize your innovations with Lifeintelect? Let's get started!"
	// 	},
	// 	ipDisputeResolution: {
	// 	  title: "IP Dispute Resolution & Enforcement",
	// 	  description:
	// 		"At Lifeintelect, we train businesses on navigating IP disputes and enforcement strategies. Our sessions cover litigation, arbitration, mediation, and enforcement methods in domestic and global contexts, preparing teams to defend their IP rights and resolve conflicts confidently and effectively.",
	// 	  process: [
	// 		{
	// 		  title: "Dispute Identification",
	// 		  description:
	// 			"Recognizing potential IP infringements or challenges."
	// 		},
	// 		{
	// 		  title: "Resolution Options",
	// 		  description:
	// 			"Exploring litigation, arbitration, and mediation as dispute resolution methods."
	// 		},
	// 		{
	// 		  title: "Enforcement Strategies",
	// 		  description:
	// 			"Developing strategies to enforce IP rights domestically and globally."
	// 		},
	// 		{
	// 		  title: "Defense Preparation",
	// 		  description:
	// 			"Preparing teams to defend IP assets in conflict scenarios."
	// 		}
	// 	  ],
	// 	  closing:
	// 		"Lifeintelect’s IP Dispute Resolution & Enforcement training prepares you to protect your IP rights. Ready to defend your IP with Lifeintelect? Let's get started!"
	// 	},
	// 	sectorSpecificIpTraining: {
	// 	  title: "Sector-Specific IP Training",
	// 	  description:
	// 		"At Lifeintelect, we offer tailored IP training for specific industries such as biotechnology, pharmaceuticals, software, electronics, agriculture, and manufacturing. Our programs address sector-specific IP trends, regulatory landscapes, case laws, and practical challenges, ensuring relevance and actionable insights for your industry.",
	// 	  closing:
	// 		"Lifeintelect’s Sector-Specific IP Training delivers industry-relevant IP expertise. Ready to master IP in your sector with Lifeintelect? Let's get started!"
	// 	}
	//   }
	// }
	ipEducationTraining: {
		title: "IP Education & Training",
		description:
		  "At LifeIntelect, we believe that awareness and understanding of intellectual property are essential for driving innovation and business success. Our IP Education and Training programs are tailored to empower startups, R&D teams, corporates, and academic institutions with the knowledge and skills needed to protect, manage, and commercialize their intellectual property. From foundational workshops to advanced strategic training, we offer a wide range of learning experiences designed to meet your goals.",
		service_1: {
		  title: "Custom IP Workshops for Teams",
		  description:
			"Every organization has unique IP challenges. We design and deliver customized workshops that address your team’s specific needs—whether it's for R&D professionals, legal departments, management, or innovation units. These interactive sessions cover core IP concepts, case studies, and industry-specific scenarios, helping teams make informed decisions related to innovation and IP protection.",
		//   subsections: [
		// 	{
		// 	  heading: "Workshop Components",
		// 	  items: [
		// 		{
		// 		  title: "Core IP Concepts",
		// 		  description:
		// 			"Covering patents, trademarks, copyrights, and trade secrets.",
		// 		},
		// 		{
		// 		  title: "Case Studies",
		// 		  description:
		// 			"Analyzing real-world IP scenarios relevant to your industry.",
		// 		},
		// 		{
		// 		  title: "Industry-Specific Scenarios",
		// 		  description:
		// 			"Addressing IP challenges unique to your organization’s sector.",
		// 		},
		// 		{
		// 		  title: "Interactive Learning",
		// 		  description:
		// 			"Engaging exercises to apply IP knowledge to practical decisions.",
		// 		},
		// 	  ],
		// 	},
		//   ],
		//   closing:
		// 	"LifeIntelect’s Custom IP Workshops empower your team with tailored IP knowledge. Ready to train your team in IP? Let's get started!",
		},
		service_2: {
		  title: "IP Fundamentals for Startups and Entrepreneurs",
		  description:
			"Startups often miss critical IP opportunities due to a lack of awareness. Our beginner-friendly training introduces entrepreneurs to key IP concepts including patents, trademarks, copyrights, trade secrets, and filing strategies. We explain how IP fits into their business model and equip them with the tools to identify and protect innovation right from the early stages.",
		//   process: [
		// 	{
		// 	  title: "IP Concept Introduction",
		// 	  description:
		// 		"Explaining patents, trademarks, copyrights, and trade secrets.",
		// 	},
		// 	{
		// 	  title: "Business Model Integration",
		// 	  description:
		// 		"Showing how IP aligns with startup business goals.",
		// 	},
		// 	{
		// 	  title: "Innovation Identification",
		// 	  description:
		// 		"Teaching entrepreneurs to spot protectable innovations.",
		// 	},
		// 	{
		// 	  title: "Filing Strategies",
		// 	  description:
		// 		"Outlining basic strategies for IP protection and filings.",
		// 	},
		//   ],
		//   closing:
		// 	"LifeIntelect’s IP Fundamentals training equips startups with essential IP knowledge. Ready to protect your startup’s innovations? Let's get started!",
		},
		service_3: {
		  title: "IP Law & Policy Updates",
		  description:
			"Intellectual property laws and regulations are constantly evolving. We keep clients up to date with the latest developments in national and international IP law, treaties, and policy changes. Our expert-led sessions help legal teams, innovators, and decision-makers stay compliant and make strategic adjustments in response to legislative shifts or global IP trends.",
		//   subsections: [
		// 	{
		// 	  heading: "Our Update Services",
		// 	  items: [
		// 		{
		// 		  title: "National Law Updates",
		// 		  description:
		// 			"Tracking changes in domestic IP laws and regulations.",
		// 		},
		// 		{
		// 		  title: "International Treaties",
		// 		  description:
		// 			"Monitoring global IP treaties and their implications.",
		// 		},
		// 		{
		// 		  title: "Policy Change Analysis",
		// 		  description:
		// 			"Assessing the impact of policy shifts on your IP strategy.",
		// 		},
		// 		{
		// 		  title: "Compliance Guidance",
		// 		  description:
		// 			"Advising on adjustments to maintain regulatory compliance.",
		// 		},
		// 	  ],
		// 	},
		//   ],
		//   closing:
		// 	"LifeIntelect’s IP Law & Policy Updates keep you ahead of regulatory changes. Ready to stay compliant with IP laws? Let's get started!",
		},
		service_4: {
		  title: "IP Management Best Practices",
		  description:
			"Effective IP management goes beyond filing. We train clients on building internal processes for invention disclosure, IP documentation, tracking deadlines, renewals, budgeting, and portfolio analysis. These sessions are ideal for in-house IP teams, innovation managers, and SMEs looking to establish professional IP management frameworks within their organizations.",
		//   process: [
		// 	{
		// 	  title: "Invention Disclosure",
		// 	  description:
		// 		"Setting up processes to capture and document innovations.",
		// 	},
		// 	{
		// 	  title: "IP Documentation",
		// 	  description:
		// 		"Creating systems for organized IP record-keeping.",
		// 	},
		// 	{
		// 	  title: "Deadline Tracking",
		// 	  description:
		// 		"Managing filing and renewal deadlines effectively.",
		// 	},
		// 	{
		// 	  title: "Portfolio Analysis",
		// 	  description:
		// 		"Analyzing IP portfolios for strategic alignment and cost-efficiency.",
		// 	},
		//   ],
		//   closing:
		// 	"LifeIntelect’s IP Management Best Practices training streamlines your IP processes. Ready to enhance your IP management? Let's get started!",
		},
		service_5: {
		  title: "IP Strategy for Product Development",
		  description:
			"Integrating IP into the product development cycle can greatly enhance a company’s competitive edge. This module helps product managers, engineers, and developers understand how to align their innovation roadmap with an IP strategy. Topics include patent landscaping, identifying protectable features, timing of filings, and competitive positioning through IP.",
		//   process: [
		// 	{
		// 	  title: "Patent Landscaping",
		// 	  description:
		// 		"Analyzing existing patents to inform product development.",
		// 	},
		// 	{
		// 	  title: "Feature Identification",
		// 	  description:
		// 		"Spotting protectable features in new products.",
		// 	},
		// 	{
		// 	  title: "Filing Timing",
		// 	  description:
		// 		"Planning the optimal timing for IP filings.",
		// 	},
		// 	{
		// 	  title: "Competitive Positioning",
		// 	  description:
		// 		"Using IP to strengthen market position against competitors.",
		// 	},
		//   ],
		//   closing:
		// 	"LifeIntelect’s IP Strategy for Product Development training boosts your product’s edge. Ready to align IP with product development? Let's get started!",
		},
		service_6: {
		  title: "IP Commercialization & Licensing Training",
		  description:
			"Understanding how to extract commercial value from IP is key to maximizing return on innovation. We offer focused training on IP monetization, licensing strategies, valuation basics, negotiation tactics, and structuring of royalty and licensing agreements. This is ideal for startups, business development teams, and tech transfer offices.",
		//   subsections: [
		// 	{
		// 	  heading: "Our Training Topics",
		// 	  items: [
		// 		{
		// 		  title: "IP Monetization",
		// 		  description:
		// 			"Exploring ways to generate revenue from IP assets.",
		// 		},
		// 		{
		// 		  title: "Licensing Strategies",
		// 		  description:
		// 			"Learning strategies for effective IP licensing.",
		// 		},
		// 		{
		// 		  title: "Valuation Basics",
		// 		  description:
		// 			"Understanding how to assess IP value.",
		// 		},
		// 		{
		// 		  title: "Negotiation Tactics",
		// 		  description:
		// 			"Mastering negotiations for licensing agreements.",
		// 		},
		// 	  ],
		// 	},
		//   ],
		//   closing:
		// 	"LifeIntelect’s IP Commercialization training maximizes your IP’s value. Ready to monetize your IP? Let's get started!",
		},
		service_7: {
		  title: "IP Dispute Resolution & Enforcement",
		  description:
			"When IP is infringed or challenged, it’s vital to understand available remedies and defense strategies. Our training covers dispute resolution methods—litigation, arbitration, mediation—and enforcement strategies in both domestic and global contexts. These sessions prepare businesses to defend their rights and navigate conflict with confidence.",
		//   subsections: [
		// 	{
		// 	  heading: "Our Training Areas",
		// 	  items: [
		// 		{
		// 		  title: "Litigation Strategies",
		// 		  description:
		// 			"Understanding litigation options for IP disputes.",
		// 		},
		// 		{
		// 		  title: "Arbitration and Mediation",
		// 		  description:
		// 			"Exploring alternative dispute resolution methods.",
		// 		},
		// 		{
		// 		  title: "Enforcement Strategies",
		// 		  description:
		// 			"Learning how to enforce IP rights domestically and globally.",
		// 		},
		// 		{
		// 		  title: "Defense Preparation",
		// 		  description:
		// 			"Preparing to defend against IP challenges.",
		// 		},
		// 	  ],
		// 	},
		//   ],
		//   closing:
		// 	"LifeIntelect’s IP Dispute Resolution training prepares you for IP conflicts. Ready to defend your IP rights? Let's get started!",
		},
		service_8: {
		  title: "Sector-Specific IP Training",
		  description:
			"Different industries have distinct IP challenges. We offer tailored training programs focused on specific sectors such as biotechnology, pharmaceuticals, software, electronics, agriculture, and manufacturing. These sessions address industry-specific IP trends, regulatory landscapes, case laws, and practical issues relevant to each domain.",
		//   subsections: [
		// 	{
		// 	  heading: "Our Sector Focus",
		// 	  items: [
		// 		{
		// 		  title: "Industry Trends",
		// 		  description:
		// 			"Covering IP trends specific to your sector.",
		// 		},
		// 		{
		// 		  title: "Regulatory Landscapes",
		// 		  description:
		// 			"Understanding sector-specific IP regulations.",
		// 		},
		// 		{
		// 		  title: "Case Law Analysis",
		// 		  description:
		// 			"Studying relevant IP case laws for your industry.",
		// 		},
		// 		{
		// 		  title: "Practical Issues",
		// 		  description:
		// 			"Addressing real-world IP challenges in your domain.",
		// 		},
		// 	  ],
		// 	},
		//   ],
		//   closing:
		// 	"LifeIntelect’s Sector-Specific IP Training addresses your industry’s unique needs. Ready to master IP in your sector? Let's get started!",
		},
	  }
  };
  
  export default subServiceContent;