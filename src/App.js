import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import FrontPage from "./components/FrontPage";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
import BlogListingPage from "./components/BlogListingPage";
import CareersPage from "./components/CareersPage";
import ServicePage from "./components/ServicePage";
import ServicePage2 from "./components/ServicePage2";
import NavBar from "./components/NavBar";
import Footer2 from "./components/Footer2";
import subServiceContent from "./data/PatentsubServiceContent";
import subServiceContent2 from "./data/Ip-life-cycle-subServiceContent";
import Scientific from "./data/ScientificTechnologyContent";
import StrategicLegalAdvisory from "./data/StrategicLegalAdvisoryContent";
import IprSolutionsStartups from "./data/IprSolutionsStartupsContent";
import IpEducationTraining from "./data/IpEducationTrainingContent";
import IpCommercial from "./data/IpCommercial-and-TechTransfer";
import TermsOfUse from "./components/TermsOfUse";
import CommonFaq from "./../src/components/CommonFaq";
import BlogForm from "./components/Blogs/BlogForm";
import BlogPosts from "./components/BlogPosts";
import BlogDetail from "./components/Blogs/BlogDetails";
import LinkWebsite from "./components/LinkWebsite";
import NewsEventDetail from "./components/News/NewsEventDetail";
import NewsEventsList from "./components/News/NewsEventsList";
import NewsEventForm from "./components/News/NewsEventForm";

// Theme configuration
const themes = {
  patent: {
    primary: "#6366f1",
    secondary: "#4f46e5",
    light: "#d946ef",
    background: "#f7f7ff",
    primaryRgb: "99, 102, 241",
    secondaryRgb: "79, 70, 229",
  },
  design: {
    primary: "#10b981",
    secondary: "#059669",
    light: "#6ee7b7",
    background: "#f0fdf4",
    primaryRgb: "16, 185, 129",
    secondaryRgb: "5, 150, 105",
  },
  copyright: {
    primary: "#3b82f6",
    secondary: "#2563eb",
    light: "#93c5fd",
    background: "#eff6ff",
    primaryRgb: "59, 130, 246",
    secondaryRgb: "37, 99, 235",
  },
  trademark: {
    primary: "#f97316",
    secondary: "#ea580c",
    light: "#fdba74",
    background: "#fff7ed",
    primaryRgb: "249, 115, 22",
    secondaryRgb: "234, 88, 12",
  },
  geographicalIndications: {
    primary: "#14b8a6",
    secondary: "#0d9488",
    light: "#5eead4",
    background: "#ecfdf5",
    primaryRgb: "20, 184, 166",
    secondaryRgb: "13, 148, 136",
  },
  nba_approval: {
    primary: "#3b82f6",
    secondary: "#2563eb",
    light: "#93c5fd",
    background: "#eff6ff",
    primaryRgb: "59, 130, 246",
    secondaryRgb: "37, 99, 235",
  },
  ipLifeCycleManagement: {
    primary: "#b91c1c",
    secondary: "#991b1b",
    light: "#f87171",
    background: "#fef2f2",
    primaryRgb: "185, 28, 28",
    secondaryRgb: "153, 27, 27",
  },
  scientificTechnology: {
    primary: "#4F46E5",
    secondary: "#7C3AED",
    light: "#E0E7FF",
    background: "#F9FAFB",
    primaryRgb: "79, 70, 229",
    secondaryRgb: "124, 58, 237",
  },
  strategicLegalAdvisory: {
    primary: "#008080",
    secondary: "#006666",
    light: "#B2DFDB",
    background: "#F0F7F7",
    primaryRgb: "0, 128, 128",
    secondaryRgb: "0, 102, 102",
  },
  iprSolutionsStartups: {
    primary: "#2E7D32",
    secondary: "#1B5E20",
    light: "#A5D6A7",
    background: "#F1F8E9",
    primaryRgb: "46, 125, 50",
    secondaryRgb: "27, 94, 32",
  },
  ipEducationTraining: {
    primary: "#0288D1",
    secondary: "#01579B",
    light: "#4FC3F7",
    background: "#E3F2FD",
    primaryRgb: "2, 136, 209",
    secondaryRgb: "1, 87, 155",
  },
};

// Route configurations
const mainRoutes = [
  { path: "/", component: FrontPage, title: "Home" },
  { path: "/about", component: AboutUs, title: "About Us" },
  { path: "/services", component: Services, title: "Our Services" },
  { path: "/contact", component: ContactUs, title: "Contact Us" },
  { path: "/blog", component: BlogListingPage, title: "Blog" },
  { path: "/careers", component: CareersPage, title: "Careers" },
  { path: "/terms", component: TermsOfUse, title: "Careers" },
  { path: "/faq", component: CommonFaq, title: "Faq" },
  { path: "/blog/:id", component: BlogDetail, title: "AddBlogForm" },
  { path: "/blog/addBlog", component: BlogForm, title: "AddBlogForm" },
  { path: "/blog/edit/:id?", component: BlogForm, title: "EditBlogForm" },
  { path: "/news", component: NewsEventsList, title: "News" },
  { path: "/news/:id", component: NewsEventDetail, title: "AddNewsEvent" },
  { path: "/news/addNewsEvent", component: NewsEventForm, title: "AddNewsEventForm" },
  { path: "/news/edit/:id", component: NewsEventForm, title: "AddNewsEventForm" },
  { path: "/links", component: LinkWebsite, title: "LinksWebsite" },
];

const patentRoutes = [
  {
    path: "/patent",
    type: "patent",
    id: "patent",
    content: subServiceContent,
    theme: themes.patent,
    component: ServicePage,
  },
  {
    path: "/design",
    type: "design",
    id: "design",
    content: subServiceContent,
    theme: themes.design,
    component: ServicePage,
  },
  {
    path: "/copyright",
    type: "copyright",
    id: "copyright",
    content: subServiceContent,
    theme: themes.copyright,
    component: ServicePage,
  },
  {
    path: "/trademark",
    type: "trademark",
    id: "trademark",
    content: subServiceContent,
    theme: themes.trademark,
    component: ServicePage,
  },
  {
    path: "/geographical-indication",
    type: "geographicalIndications",
    id: "geographical Indications",
    content: subServiceContent,
    theme: themes.geographicalIndications,
    component: ServicePage,
  },
  {
    path: "/nba_approval",
    type: "nba_approval",
    id: "nba_approval",
    content: subServiceContent,
    theme: themes.nba_approval,
    component: ServicePage,
  },
];
const ipCommercialRoutes = [
  {
    path: "/ipCommercial",
    type: "ipCommercial",
    id: "ipcommercial",
    content: IpCommercial,
    theme: themes.patent,
    component: ServicePage,
  },
];

const ipLifecycleRoutes = [
  {
    path: "/ip-audit",
    type: "ipLifeCycleManagement",
    id: "ipAudit",
    content: subServiceContent2,
    theme: themes.ipLifeCycleManagement,
    component: ServicePage,
  },
  {
    path: "/ip-policy",
    type: "ipLifeCycleManagement",
    id: "ipPolicy",
    content: subServiceContent2,
    theme: themes.ipLifeCycleManagement,
    component: ServicePage2,
  },
  {
    path: "/ip-portfolio",
    type: "ipLifeCycleManagement",
    id: "ipPortfolio",
    content: subServiceContent2,
    theme: themes.ipLifeCycleManagement,
    component: ServicePage2,
  },
  {
    path: "/ip-valuation",
    type: "ipLifeCycleManagement",
    id: "ipValuation",
    content: subServiceContent2,
    theme: themes.ipLifeCycleManagement,
    component: ServicePage2,
  },
  {
    path: "/technology-transfer",
    type: "ipLifeCycleManagement",
    id: "technologyTransfer",
    content: subServiceContent2,
    theme: themes.ipLifeCycleManagement,
    component: ServicePage2,
  },
  {
    path: "/ip-education",
    type: "ipLifeCycleManagement",
    id: "ipEducation",
    content: subServiceContent2,
    theme: themes.ipLifeCycleManagement,
    component: ServicePage2,
  },
  {
    path: "/ip-research",
    type: "ipLifeCycleManagement",
    id: "ipResearch",
    content: subServiceContent2,
    theme: themes.ipLifeCycleManagement,
    component: ServicePage2,
  },

  {
    path: "/analysis-diligence",
    type: "ipLifeCycleManagement",
    id: "ipAnalysis",
    content: subServiceContent2,
    theme: themes.ipLifeCycleManagement,
    component: ServicePage2,
  },
  {
    path: "/ip-landscape",
    type: "ipLifeCycleManagement",
    id: "ipLandscape",
    content: subServiceContent2,
    theme: themes.ipLifeCycleManagement,
    component: ServicePage2,
  },
  {
    path: "/ip-research-strategy",
    type: "ipLifeCycleManagement",
    id: "ip-research-strategy",
    content: subServiceContent2,
    theme: themes.ipLifeCycleManagement,
    component: ServicePage2,
  },
];

const scientificRoutes = [
  {
    path: "/Scientific-&-Technology-Solutions",
    type: "scientificTechnology",
    id: "scientificSolutions",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage,
  },
  {
    path: "/patent-valuations",
    type: "scientificTechnology",
    id: "patentValuations",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
  {
    path: "/drug-discovery",
    type: "scientificTechnology",
    id: "drugDiscoveryDevelopment",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
  {
    path: "/patent-due-diligence",
    type: "scientificTechnology",
    id: "patentDueDiligence",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
  {
    path: "/clinical-potential",
    type: "scientificTechnology",
    id: "clinicalCommercialPotential",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
  {
    path: "/competitive-landscape",
    type: "scientificTechnology",
    id: "competitiveLandscape",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
  {
    path: "/management-consulting",
    type: "scientificTechnology",
    id: "managementConsulting",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
  {
    path: "/market-research",
    type: "scientificTechnology",
    id: "marketResearch",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
  {
    path: "/scientific-writing",
    type: "scientificTechnology",
    id: "scientificWritingEditing",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
  {
    path: "/non-patent-searches",
    type: "scientificTechnology",
    id: "nonPatentSearches",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
];

const CommercializationRoutes = [
  // { path: '/patent-valuations', type: 'scientificTechnology', id: 'patentValuations', content: Scientific, theme: themes.scientificTechnology, component: ServicePage2 },
  // { path: '/IP-Commercialization-&-Licensing-Training', type: 'ipEducationTraining', id: 'ipCommercializationLicensing', content: IpEducationTraining, theme: themes.ipEducationTraining, component: ServicePage },
  // { path: '/patent-due-diligence', type: 'scientificTechnology', id: 'patentDueDiligence', content: Scientific, theme: themes.scientificTechnology, component: ServicePage2 },
  {
    path: "/competitive-landscape",
    type: "scientificTechnology",
    id: "competitiveLandscape",
    content: Scientific,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
  {
    path: "/post-transfer",
    type: "ipCommercial",
    id: "postTransfer",
    content: IpCommercial,
    theme: themes.scientificTechnology,
    component: ServicePage2,
  },
];

const strategicRoutes = [
  {
    path: "/ip-strategy-development",
    type: "strategicLegalAdvisory",
    id: "ipStrategyDevelopment",
    content: StrategicLegalAdvisory,
    theme: themes.strategicLegalAdvisory,
    component: ServicePage,
  },
  {
    path: "/IP-Litigation-&-Enforcement-Support",
    type: "strategicLegalAdvisory1",
    id: "ipLitigationSupport",
    content: StrategicLegalAdvisory,
    theme: themes.strategicLegalAdvisory,
    component: ServicePage2,
  },
  {
    path: "/Licensing-&-IP-Agreements",
    type: "strategicLegalAdvisory1",
    id: "licensingIpAgreements",
    content: StrategicLegalAdvisory,
    theme: themes.strategicLegalAdvisory,
    component: ServicePage2,
  },
  {
    path: "/Cross-Border-IP-Strategy-&-Compliance",
    type: "strategicLegalAdvisory1",
    id: "crossBorderIpStrategy",
    content: StrategicLegalAdvisory,
    theme: themes.strategicLegalAdvisory,
    component: ServicePage2,
  },
  {
    path: "/Trade-Secret-Protection-&-Confidentiality",
    type: "strategicLegalAdvisory1",
    id: "tradeSecretProtection",
    content: StrategicLegalAdvisory,
    theme: themes.strategicLegalAdvisory,
    component: ServicePage2,
  },
  {
    path: "/IP-Exit-Strategy-&-Monetization",
    type: "strategicLegalAdvisory1",
    id: "ipExitStrategy",
    content: StrategicLegalAdvisory,
    theme: themes.strategicLegalAdvisory,
    component: ServicePage2,
  },
  {
    path: "/Corporate-IP-Governance-&-Risk-Mitigation",
    type: "strategicLegalAdvisory1",
    id: "corporateIpGovernance",
    content: StrategicLegalAdvisory,
    theme: themes.strategicLegalAdvisory,
    component: ServicePage2,
  },
  {
    path: "/Patent-&-Trademark-Portfolio-Optimization",
    type: "strategicLegalAdvisory1",
    id: "patentTrademarkPortfolio",
    content: StrategicLegalAdvisory,
    theme: themes.strategicLegalAdvisory,
    component: ServicePage2,
  },
  {
    path: "/Government-and-Policy-Advocacy",
    type: "strategicLegalAdvisory",
    id: "governmentPolicyAdvocacy",
    content: StrategicLegalAdvisory,
    theme: themes.strategicLegalAdvisory,
    component: ServicePage,
  },
];

const startupRoutes = [
  {
    path: "/IP-Strategy-&-Roadmap-for-Startups",
    type: "iprSolutionsStartups",
    id: "ipStrategyRoadmap",
    content: IprSolutionsStartups,
    theme: themes.iprSolutionsStartups,
    component: ServicePage,
  },
  {
    path: "/Cost-Effective-IP-Protection",
    type: "iprSolutionsStartups",
    id: "costEffectiveProtection",
    content: IprSolutionsStartups,
    theme: themes.iprSolutionsStartups,
    component: ServicePage2,
  },
  {
    path: "/IP-Due-Diligence-for-Investors",
    type: "iprSolutionsStartups",
    id: "ipDueDiligenceInvestors",
    content: IprSolutionsStartups,
    theme: themes.iprSolutionsStartups,
    component: ServicePage2,
  },
  {
    path: "/IP-Licensing-&-Commercialization",
    type: "iprSolutionsStartups",
    id: "ipLicensingCommercialization",
    content: IprSolutionsStartups,
    theme: themes.iprSolutionsStartups,
    component: ServicePage2,
  },
  {
    path: "/Raising-Awareness-and-Funding-with-IP",
    type: "iprSolutionsStartups",
    id: "raisingAwarenessFunding",
    content: IprSolutionsStartups,
    theme: themes.iprSolutionsStartups,
    component: ServicePage2,
  },
  {
    path: "/Startup-IP-Portfolio-Management",
    type: "iprSolutionsStartups",
    id: "startupIpPortfolio",
    content: IprSolutionsStartups,
    theme: themes.iprSolutionsStartups,
    component: ServicePage2,
  },
  {
    path: "/IP-Risk-Management-for-Startups",
    type: "iprSolutionsStartups",
    id: "ipRiskManagement",
    content: IprSolutionsStartups,
    theme: themes.iprSolutionsStartups,
    component: ServicePage2,
  },
];

const educationRoutes = [
  {
    path: "/Custom-IP-Workshops-for-Teams",
    type: "ipEducationTraining",
    id: "customIpWorkshops",
    content: IpEducationTraining,
    theme: themes.ipEducationTraining,
    component: ServicePage,
  },
  {
    path: "/IP-Fundamentals-for-Startups-and-Entrepreneurs",
    type: "ipEducationTraining",
    id: "ipFundamentalsStartups",
    content: IpEducationTraining,
    theme: themes.ipEducationTraining,
    component: ServicePage,
  },
  {
    path: "/IP-Law-&-Policy-Updates",
    type: "ipEducationTraining1",
    id: "ipLawPolicyUpdates",
    content: IpEducationTraining,
    theme: themes.ipEducationTraining,
    component: ServicePage2,
  },
  {
    path: "/IP-Management-Best-Practices",
    type: "ipEducationTraining1",
    id: "ipManagementPractices",
    content: IpEducationTraining,
    theme: themes.ipEducationTraining,
    component: ServicePage2,
  },
  {
    path: "/IP-Strategy-for-Product-Development",
    type: "ipEducationTraining1",
    id: "ipStrategyProductDevelopment",
    content: IpEducationTraining,
    theme: themes.ipEducationTraining,
    component: ServicePage2,
  },
  {
    path: "/IP-Commercialization-&-Licensing-Training",
    type: "ipEducationTraining1",
    id: "ipCommercializationLicensing",
    content: IpEducationTraining,
    theme: themes.ipEducationTraining,
    component: ServicePage2,
  },
  {
    path: "/IP-Dispute-Resolution-&-Enforcement",
    type: "ipEducationTraining1",
    id: "ipDisputeResolution",
    content: IpEducationTraining,
    theme: themes.ipEducationTraining,
    component: ServicePage2,
  },
  {
    path: "/Sector-Specific-IP-Training",
    type: "ipEducationTraining1",
    id: "sectorSpecificIpTraining",
    content: IpEducationTraining,
    theme: themes.ipEducationTraining,
    component: ServicePage2,
  },
];

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          {/* Main Routes */}
          {mainRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          {/* Patent Services */}
          {patentRoutes.map(
            ({ path, type, content, theme, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Component
                    serviceType={type}
                    theme={theme}
                    subServiceContent={content}
                  />
                }
              />
            )
          )}

          {/* IP Lifecycle Management */}
          {ipLifecycleRoutes.map(
            ({ path, type, id, content, theme, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Component
                    serviceType={type}
                    subServiceId={id}
                    theme={theme}
                    subServiceContent={content}
                  />
                }
              />
            )
          )}

          {/* ipCommercial */}
          {ipCommercialRoutes.map(
            ({ path, type, id, content, theme, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Component
                    serviceType={type}
                    subServiceId={id}
                    theme={theme}
                    subServiceContent={content}
                  />
                }
              />
            )
          )}

          {/* Scientific Technology Services */}
          {scientificRoutes.map(
            ({ path, type, id, content, theme, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Component
                    serviceType={type}
                    subServiceId={id}
                    theme={theme}
                    subServiceContent={content}
                  />
                }
              />
            )
          )}

          {/* Strategic Legal Advisory Services */}
          {strategicRoutes.map(
            ({ path, type, id, content, theme, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Component
                    serviceType={type}
                    subServiceId={id}
                    theme={theme}
                    subServiceContent={content}
                  />
                }
              />
            )
          )}

          {/* IPR Solutions for Startups */}
          {startupRoutes.map(
            ({ path, type, id, content, theme, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Component
                    serviceType={type}
                    subServiceId={id}
                    theme={theme}
                    subServiceContent={content}
                  />
                }
              />
            )
          )}

          {/* IP Education and Training */}
          {educationRoutes.map(
            ({ path, type, id, content, theme, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Component
                    serviceType={type}
                    subServiceId={id}
                    theme={theme}
                    subServiceContent={content}
                  />
                }
              />
            )
          )}
          {CommercializationRoutes.map(
            ({ path, type, id, content, theme, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Component
                    serviceType={type}
                    subServiceId={id}
                    theme={theme}
                    subServiceContent={content}
                  />
                }
              />
            )
          )}
        </Routes>
        <Footer2 />
      </Router>
    </div>
  );
}

export default App;
