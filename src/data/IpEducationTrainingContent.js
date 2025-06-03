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
		title: "IP EDUCATION AND TRAINING ",
		subtitle:"Build IP Awareness, Sharpen Competitive Edge",
		description:"Understanding intellectual property is critical to staying innovative, protecting valuable assets, and unlocking new market opportunities. Lifeintelect’s IP education and training programs are designed to equip startups, corporates, R&D teams, legal professionals, and academic institutions with actionable IP knowledge. With extensive expertise across law, science, and industry, we deliver insight-driven learning tailored to your specific innovation environment.",
		service_1: {
		  title: "IP Workshops for Startups and Entrepreneurs",
		  description:"Early-stage ventures often overlook IP until it’s too late. Lifeintelect addresses this gap by helping entrepreneurs and founders understand the role of IP in business strategy. These interactive sessions simplify patents, trademarks, copyrights, and trade secrets—explaining when, where, and how to file while helping identify protectable innovations from day one.",
		  subsections: [
			{
			  heading: "What You’ll Gain:",
			  items: [
				{
				  title: "Master IP Fundamentals",
				  description:"Gain clarity on patents, trademarks, copyrights, and trade secrets.",
				},
				{
				  title: "File with Confidence",
				  description:"Learn the best filing strategies to secure your innovations early.",
				},
				{
				  title: "Integrate IP into Your Business:",
				  description:"Understand how IP aligns with and enhances your startup’s growth strategy.",
				},
				
			  ],
			},
		  ],
			},
		service_2: {
		  title: "Customized IP Training for Corporates and R&D Teams",
		  description:"IP needs vary by department and industry. Through tailored workshops for legal teams, R&D units, product managers, and leadership, participants gain practical skills using real-world case studies and sector-relevant scenarios. Teams leave equipped to make informed innovation and protection decisions.",
		  subsections: [
			{
			  heading: "What You’ll Take Away:",
			  items: [
				{
				  title: "Real-World Case Studies",
				  description:"Learn from industry-specific scenarios to navigate IP decisions effectively.",
				},
				{
				  title: "Informed Decision Making",
				  description:"Empower your team to make sound, strategic IP choices.",
				},
				{
				  title: "Practical IP Application",
				  description:"Equip your team with actionable skills to manage IP across the organization.",
				},
				
			  ],
			},
		  ],
		//   closing:
		// 	"LifeIntelect’s IP Fundamentals training equips startups with essential IP knowledge. Ready to protect your startup’s innovations? Let's get started!",
		},
		service_3: {
		  title: "IP Law & Policy Updates",
		  description:"with laws and treaties in constant flux, staying updated is essential. Our expert-led briefings decode key shifts in IP legislation—national and global—helping legal counsels, compliance officers, and strategy leaders stay aligned, mitigate risks, and respond to policy changes with agility.",
		  subsections: [
			{
			  heading: "What You’ll Learn:",
			  items: [
				{
				  title: "Stay Ahead of Legislation: ",
				  description:"Get the latest updates on changing national and international IP laws.",
				},
				{
				  title: "Adapt to Policy Changes",
				  description:"Learn how shifts in IP policies impact your business.",
				},
				{
				  title: "Ensure Compliance",
				  description:"Equip your team with knowledge to remain compliant with evolving regulations.",
				},
			  ],
			},
		  ],
		//   closing:
		// 	"LifeIntelect’s IP Law & Policy Updates keep you ahead of regulatory changes. Ready to stay compliant with IP laws? Let's get started!",
		},
		service_4: {
		  title: "IP Management Best Practices",
		  description:"Beyond registration, effective IP governance requires structure. These sessions guide in-house teams on setting up and refining IP workflows—covering disclosure processes, documentation, budgeting, renewal tracking, and portfolio analysis. Ideal for scaling organizations building a formal IP framework.",
		subsections: [
			{
			  heading: "What You’ll Implement:",
			  items: [
				{
				  title: "Structured IP Workflows ",
				  description:"Create efficient processes for managing IP in-house.",
				},
				{
				  title: "Cost-Efficient IP Portfolio",
				  description:"Learn how to budget for and track IP-related expenses effectively.",
				},
				{
				  title: "Long-Term IP Success",
				  description:"Build a sustainable framework for maintaining and growing your IP portfolio.",
				},
			  ],
			},
		  ],
		//   closing:
		// 	"LifeIntelect’s IP Management Best Practices training streamlines your IP processes. Ready to enhance your IP management? Let's get started!",
		},
		service_5: {
		  title: "IP Strategy for Product Development",
		  description:"For innovation to translate into market advantage, IP must be factored in from the design stage. This module helps technical teams integrate IP strategy into the development lifecycle, with focus areas like patent landscapes, timing of filings, and differentiating products via IP positioning.",
		subsections: [
			{
			  heading: "What You’ll Achieve:",
			  items: [
				{
				  title: "Integrate IP with Innovation ",
				  description:"Build a product development process where IP strategy and innovation go hand-in-hand.",
				},
				{
				  title: "Create Market Differentiation",
				  description:"Use patents and IP assets to set your product apart and secure market share.",
				},
				{
				  title: "Timing Your Filings",
				  description:"Learn the right time to file patents and protect key features.",
				},
			  ],
			},
		  ],
		//   closing:
		// 	"LifeIntelect’s IP Strategy for Product Development training boosts your product’s edge. Ready to align IP with product development? Let's get started!",
		},
		service_6: {
		  title: "IP Commercialization & Licensing Training",
		  description:"Extracting value from IP assets demands both legal and market intelligence. These trainings unpack monetization models, licensing strategy, royalty structures, valuation basics, and negotiation tactics—empowering business development teams and tech transfer professionals to drive returns on innovation.",
		  subsections: [
			{
			  heading: "What You’ll Master:",
			  items: [
				{
				  title: "Unlock IP Value",
				  description:"Discover the best ways to monetize your IP.",
				},
				{
				  title: "Craft Winning Licensing Agreements",
				  description:
					"Learn how to negotiate and structure licensing deals.",
				},
				{
				  title: "Valuation and Strategy: ",
				  description:
					"Understand how to assess the commercial worth of your IP.",
				},
				
			  ],
			},
		  ],
		//   closing:
		// 	"LifeIntelect’s IP Commercialization training maximizes your IP’s value. Ready to monetize your IP? Let's get started!",
		},
		service_7: {
		  title: "IP Dispute Resolution & Enforcement",
		  description:"When infringement arises or enforcement becomes necessary, understanding your legal options is critical. This module equips clients with the knowledge to navigate IP disputes effectively—whether through litigation, arbitration, or mediation—and provides insight into global enforcement tactics. Be ready to assert and protect your IP rights confidently, across any jurisdiction.",
		  subsections: [
			{
			  heading: "What You’ll Be Ready For:",
			  items: [
				{
				  title: "Resolve Disputes with Confidence",
				  description:"Gain a clear understanding of when and how to use litigation, arbitration, or mediation to address IP conflicts.",
				},
				{
				  title: "Protect Your IP Worldwide",
				  description:"Be fully prepared to enforce your rights and respond to infringement in both domestic and international markets",
				},
				{
				  title: "Strategic Enforcement Planning",
				  description:"Develop practical, jurisdiction-specific strategies to defend your IP and minimize business risks.",
				},
				
			  ],
			},
		  ],
		//   closing:
		// 	"LifeIntelect’s IP Dispute Resolution training prepares you for IP conflicts. Ready to defend your IP rights? Let's get started!",
		},
		service_8: {
		  title: "Sector-Specific IP Training",
		  description:"Intellectual property challenges vary widely across industries. Whether you're in biotech, pharma, electronics, agri-tech, software, or manufacturing, your team needs targeted expertise. This training delivers industry-tailored programs that dive into applicable regulations, key case law, protection strategies, and future-facing IP trends—preparing your team to manage real-world IP complexities with confidence.",
		  subsections: [
			{
			  heading: "What You’ll Specialize In:",
			  items: [
				{
				  title: "Sector-Aligned IP Strategies",
				  description:
					"Customize your IP approach to fit the technical and legal demands of your industry.",
				},
				{
				  title: "Master Regulatory Navigation",
				  description:
					"Understand and adapt to the regulatory environment specific to your sector.",
				},
				{
				  title: "Capitalize on IP Trends",
				  description:"Stay ahead by spotting emerging IP opportunities and challenges unique to your market.",
				},
				// {
				//   title: "Practical Issues",
				//   description:
				// 	"Addressing real-world IP challenges in your domain.",
				// },
			  ],
			},
		  ],
		//   closing:
		// 	"LifeIntelect’s Sector-Specific IP Training addresses your industry’s unique needs. Ready to master IP in your sector? Let's get started!",
		},
	  }
  };
  
  export default subServiceContent;