'use client';
import React from 'react';
import LegalPageLayout from '../../components/LegalPageLayout';

const InvestmentTermsPage = () => {
  return (
    <LegalPageLayout title="Investment Terms & Conditions" lastUpdated="March 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Introduction</h2>
          <p className="text-gray-700 mb-4">
            These Terms & Conditions ("Agreement") govern your investment in agricultural projects offered by AgriPath. By proceeding with an investment, you acknowledge that you have read, understood, and agreed to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">1. Investment Acknowledgement</h2>
          <p className="text-gray-700 mb-2">By investing with AgriPath, you confirm that:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You understand the nature of agricultural investments and the associated risks.</li>
            <li>You have carefully reviewed all documentation before making an investment.</li>
            <li>You agree that investments are tied to specific farming cycles and returns are dependent on crop production and market conditions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">2. Investment Structure & Duration</h2>
          <p className="text-gray-700 mb-2">Investments are structured on a per-unit, per-crop, or per-project basis.</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Each investment is linked to a specific crop cycle, and payouts will only occur after harvest.</li>
            <li>Investors may not withdraw funds before the completion of the farming cycle.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">3. Returns & Payouts</h2>
          <p className="text-gray-700 mb-2">Returns on investments depend on farm yield and market conditions.</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Investors will receive payouts as per the agreed revenue-sharing model.</li>
            <li>Returns are paid after harvest, subject to processing and market conditions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">4. Risk Disclaimer</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Agricultural investments carry inherent risks, including weather conditions, pest outbreaks, and market fluctuations.</li>
            <li>While AgriPath implements risk mitigation strategies, we do not guarantee fixed returns.</li>
            <li>In the event of a major failure or unforeseen situation, AgriPath will communicate all necessary updates.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">5. Refund Policy</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Investments are non-refundable once the farming cycle begins.</li>
            <li>Refunds are only processed if AgriPath cancels a project before planting.</li>
            <li>If a duplicate transaction occurs, investors may request a refund within 7 days of payment.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">6. Investor Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Investors must provide accurate personal and financial details during registration.</li>
            <li>Any changes must be communicated to AgriPath within 14 days of the changing details.</li>
            <li>Investors must comply with applicable laws regarding agricultural investments.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">7. Data Protection & Privacy</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Personal data is collected for investment processing and communication.</li>
            <li>Data is protected in accordance with AgriPath's Privacy Policy and is not shared with third parties except where legally required.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">8. Termination & Amendments</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>AgriPath reserves the right to modify these terms, and investors will be notified of any major changes.</li>
            <li>In case of fraud, misrepresentation, or violation of these terms, AgriPath may terminate an investor's participation.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">9. Contact Us</h2>
          <p className="text-gray-700">
            For any concerns regarding these terms, contact us at <a href="mailto:info@agripath.co" className="text-green-600 hover:underline">info@agripath.co</a>
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
};

export default InvestmentTermsPage; 