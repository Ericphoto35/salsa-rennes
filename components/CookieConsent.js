import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="J'accepte"
      cookieName="salsa-rennes-cookie-consent"
      style={{ 
        background: "rgba(43, 43, 43, 0.95)",
        fontSize: "14px",
        padding: "10px 20px",
        alignItems: "center",
        zIndex: 9999
      }}
      buttonStyle={{ 
        background: "#f6bc7c", 
        color: "#2b2b2b", 
        fontSize: "14px",
        borderRadius: "20px",
        padding: "8px 16px",
        fontWeight: "600"
      }}
      declineButtonStyle={{
        background: "transparent",
        border: "1px solid #f6bc7c",
        color: "#f6bc7c",
        fontSize: "14px",
        borderRadius: "20px",
        padding: "7px 15px",
        fontWeight: "600",
        marginLeft: "10px"
      }}
      enableDeclineButton
      declineButtonText="Je refuse"
      expires={150} // Expire après 150 jours
      overlay
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div>
          <p className="text-white mb-2">
            Ce site utilise des cookies pour améliorer votre expérience de navigation, analyser le trafic et personnaliser le contenu.
          </p>
          <p className="text-white text-sm">
            En cliquant sur "J'accepte", vous consentez à notre utilisation des cookies conformément à notre{" "}
            <a 
              href="/politique-de-confidentialite" 
              className="text-[#f6bc7c] underline hover:no-underline"
              onClick={(e) => e.stopPropagation()}
            >
              politique de confidentialité
            </a>.
          </p>
        </div>
      </div>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
