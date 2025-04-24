import React from "react";
import styled from "styled-components";

const ServicePage = ({ serviceType, theme, subServiceContent }) => {
  const services = subServiceContent[serviceType] || {};
  const pageTitle = `${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Services`;
  const pageSubtitle = `Protecting Your ${
    serviceType === "patent" ? "Inventions" :
    serviceType === "design" ? "Visual Creations" :
    serviceType === "copyright" ? "Creative Works" :
    "Brand Identity"
  } with Expert IP Solutions`;
  const ctaHeading = `Ready to Protect Your ${
    serviceType === "patent" ? "Inventions" :
    serviceType === "design" ? "Designs" :
    serviceType === "copyright" ? "Creative Works" :
    "Brand"
  }?`;
  const ctaSubheading = `Contact our ${serviceType} experts today for a free consultation`;

  return (
    <PageContainer>
      <Hero theme={theme}>
        <HeroContent>
          <PageTitle>{pageTitle}</PageTitle>
          <PageSubtitle>{pageSubtitle}</PageSubtitle>
        </HeroContent>
      </Hero>

      {services.title || services.description ? (
        <Section>
          {services.title && (
            <ServiceHeader theme={theme}>
              <ServiceName>{services.title}</ServiceName>
            </ServiceHeader>
          )}
          {services.description && (
            <SectionText>{services.description}</SectionText>
          )}
        </Section>
      ) : null}

      <ServicesContainer>
        {Object.entries(services)
          .filter(([key]) => key.startsWith("service_"))
          .map(([serviceId, service]) => (
            <ServiceCard key={serviceId} id={serviceId}>
              <ServiceHeader theme={theme}>
                <ServiceNumber theme={theme}>{serviceId.split("_")[1]}</ServiceNumber>
                <ServiceName>{service.title}</ServiceName>
              </ServiceHeader>


            <ServiceContent>
              {/* Render main description and image if exists */}
              {service.description && (
                <Section>
                  <SectionText>{service.description}</SectionText>
                  <SectionText>{service.description1}</SectionText>
                  <SectionText>{service.description2}</SectionText>
                  <SectionText>{service.description3}</SectionText>
                  <SectionText>{service.description4}</SectionText>
                  {service.image && (
                    <ServiceImage
                      src={service.image}
                      alt={`${service.title} Illustration`}
                    />
                  )}
                </Section>
              )}

              {/* Render process sections */}
              {service.process && (
                <Section>
                  <SectionHeading theme={theme}>Our Process</SectionHeading>
                  <ServiceList>
                    {service.process.map((item, i) => (
                      <ServiceListItem key={i}>
                        <ListItemIcon theme={theme}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </ListItemIcon>
                        <ListItemContent>
                          <ListItemTitle>{item.title}</ListItemTitle>
                          <ListItemDescription>{item.description}</ListItemDescription>
                          {item.subPoints && (
                            <SubPointsList>
                              {item.subPoints.map((subPoint, j) => (
                                <SubPointItem key={j}>{subPoint}</SubPointItem>
                              ))}
                            </SubPointsList>
                          )}
                        </ListItemContent>
                      </ServiceListItem>
                    ))}
                  </ServiceList>
                </Section>
              )}

              {/* Render service types and image if exists */}
              {service.typesSection && (
                <Section>
                  <SectionHeading theme={theme}>Types of {service.title} Services</SectionHeading>
                  {service.typesSection.image && (
                    <ServiceImage
                      src={service.typesSection.image}
                      alt={`Types of ${service.title} Illustration`}
                    />
                  )}
                  <ServiceList>
                    {service.typesSection.types.map((type, i) => (
                      <ServiceListItem key={i}>
                        <ListItemIcon theme={theme}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </ListItemIcon>
                        <ListItemContent>
                          <ListItemTitle>{type.title}</ListItemTitle>
                          <ListItemDescription>{type.description}</ListItemDescription>
                        </ListItemContent>
                      </ServiceListItem>
                    ))}
                  </ServiceList>
                  {/* {service.typesSection.image && (
                    <ServiceImage
                      src={service.typesSection.image}
                      alt={`Types of ${service.title} Illustration`}
                    />
                  )} */}
                </Section>
              )}

              {/* Render subsections */}
              {service.subsections && service.subsections.map((subsection, index) => (
                <Section key={index}>
                  {subsection.heading && <SectionHeading theme={theme}>{subsection.heading}</SectionHeading>}
                  {subsection.description && <SectionText>{subsection.description}</SectionText>}

                  {subsection.items && (
                    <ServiceList>
                      {subsection.items.map((item, i) => (
                        <ServiceListItem key={i}>
                          <ListItemIcon theme={theme}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                              <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </ListItemIcon>
                          <ListItemContent>
                            {item.title && <ListItemTitle>{item.title}</ListItemTitle>}
                            <ListItemDescription>{item.description}</ListItemDescription>
                          </ListItemContent>
                        </ServiceListItem>
                      ))}
                    </ServiceList>
                  )}

                  {subsection.steps && (
                    <StepsList>
                      {subsection.steps.map((step, i) => (
                        <StepItem key={i}>
                          <StepNumber theme={theme}>{i + 1}</StepNumber>
                          <StepContent>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                            {step.subPoints && (
                              <SubPointsList>
                                {step.subPoints.map((subPoint, j) => (
                                  <SubPointItem key={j}>{subPoint}</SubPointItem>
                                ))}
                              </SubPointsList>
                            )}
                          </StepContent>
                        </StepItem>
                      ))}
                    </StepsList>
                  )}
                </Section>
              ))}

              {/* Render closing statement if exists */}
              {service.closing && (
                <Section>
                  <SectionText>{service.closing}</SectionText>
                </Section>
              )}
            </ServiceContent>
          </ServiceCard>
        ))}
      </ServicesContainer>

      {/* <CallToAction theme={theme}>
        <CTAContent>
          <CTAHeading>{ctaHeading}</CTAHeading>
          <CTASubheading>{ctaSubheading}</CTASubheading>
          <CTAButton theme={theme}>Get Started</CTAButton>
        </CTAContent>
      </CallToAction> */}
    </PageContainer>
  );
};

// Modern styled components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  padding-top: 70px;
  color: #1a202c;
  line-height: 1.6;
  background-color: #fafafa;
`;

const Hero = styled.header`
  margin: 40px 0 60px;
  padding: 80px 20px;
  border-radius: 24px;
  position: relative;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, ${theme.light})`};
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 16px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.025em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PageSubtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;

const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 64px;
`;

const ServiceCard = styled.article`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.background};
  padding: 24px 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const ServiceNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 20px;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => `rgba(${theme.primaryRgb}, 0.1)`};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const ServiceName = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
  color: #1a202c;
`;

const ServiceContent = styled.div`
  padding: 30px;
  flex: 1;
`;

const Section = styled.div`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeading = styled.h3`
  font-size: 1.25rem;
  color: #1a202c;
  margin: 0 0 20px 0;
  font-weight: 600;
  position: relative;
  padding-bottom: 12px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: ${({ theme }) => theme.primary};
    border-radius: 3px;
  }
`;

const SectionText = styled.p`
  margin: 0 0 20px 0;
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.7;
  margin-Top: 12px;
  padding: 0 10px;
`;

const ServiceImage = styled.img`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 3 / 2;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  object-fit: contain;
  display: block;
`;

const ServiceList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ServiceListItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
    transform: translateX(5px);
  }
`;

const ListItemIcon = styled.div`
  color: ${({ theme }) => theme.primary};
  margin-right: 16px;
  margin-top: 2px;
`;

const ListItemContent = styled.div`
  flex: 1;
`;

const ListItemTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  color: #1a202c;
`;

const ListItemDescription = styled.div`
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.7;
`;

const StepsList = styled.ol`
  margin: 24px 0;
  padding: 0;
  list-style: none;
  counter-reset: step-counter;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StepItem = styled.li`
  display: flex;
  align-items: flex-start;
  counter-increment: step-counter;
  position: relative;
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 16px;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  color: #1a202c;
`;

const StepDescription = styled.div`
  color: #4a5568;
  line-height: 1.7;
`;

const CallToAction = styled.div`
  margin: 60px 0 40px;
  border-radius: 24px;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`};
  padding: 4px;
  position: relative;
  overflow: hidden;
`;

const CTAContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 48px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const CTAHeading = styled.h3`
  color: #1a202c;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 16px 0;
`;

const CTASubheading = styled.p`
  color: #4a5568;
  font-size: 1.125rem;
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.button`
  padding: 14px 36px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px ${({ theme }) => `rgba(${theme.primaryRgb}, 0.3)`};
  
  &:hover {
    background: ${({ theme }) => theme.secondary};
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px ${({ theme }) => `rgba(${theme.secondaryRgb}, 0.4)`};
  }
`;
const SubPointsList = styled.ul`
  margin: 12px 0 0 20px;
  padding: 0;
  list-style-type: disc;
  color: #4a5568;
`;

const SubPointItem = styled.li`
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 8px;
`;

export default ServicePage;