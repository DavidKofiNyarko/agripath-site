'use client';
import React from 'react';
import LegalPageLayout from '../../components/LegalPageLayout';

const RefundPolicyPage = () => {
  return (
    <LegalPageLayout title="Refund Policy" lastUpdated="February 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Introduction</h2>
          <p className="text-gray-700 mb-3">
            This Refund Policy outlines the terms and conditions regarding refunds for investments made through the AgriPath platform. We are committed to fair and transparent refund practices while ensuring the sustainability of agricultural projects and investments.
          </p>
          <p className="text-gray-700 mb-3">
            By using our platform and making investments, you acknowledge and agree to the terms of this Refund Policy. Please read this policy carefully before making any investments.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Investment Nature and Risks</h2>
          <p className="text-gray-700 mb-3">
            Agricultural investments through AgriPath represent financial commitments to real-world agricultural projects with inherent risks. These investments:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Support ongoing agricultural operations and development</li>
            <li>Are subject to natural, market, and operational risks</li>
            <li>May have long-term maturity periods depending on the project</li>
            <li>Are not guaranteed to provide returns within specific timeframes</li>
          </ul>
          <p className="text-gray-700 mt-3">
            We encourage all investors to carefully review project details, risk factors, and expected timelines before committing funds to any investment opportunity on our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Cooling-Off Period</h2>
          <p className="text-gray-700 mb-3">
            AgriPath provides a 48-hour cooling-off period after an investment is made, during which investors may cancel their investment and receive a full refund without any penalties or deductions. This period begins from the time the investment transaction is confirmed on our platform.
          </p>
          <p className="text-gray-700 mb-3">
            To request a cancellation during the cooling-off period:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Log into your AgriPath account</li>
            <li>Navigate to the "My Investments" section</li>
            <li>Select the investment you wish to cancel</li>
            <li>Click on the "Cancel Investment" option</li>
            <li>Follow the prompts to complete the cancellation process</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Upon successful cancellation within the cooling-off period, the refund will be processed using the same payment method used for the original transaction within 5-7 business days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Refunds After the Cooling-Off Period</h2>
          <p className="text-gray-700 mb-3">
            After the 48-hour cooling-off period has expired, investments are generally considered final and non-refundable due to the nature of agricultural projects and the allocation of funds. However, we recognize that exceptional circumstances may arise.
          </p>
          <p className="text-gray-700 mb-3">
            Refund requests after the cooling-off period will be evaluated on a case-by-case basis, taking into account:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>The nature and stage of the agricultural project</li>
            <li>Whether funds have already been deployed to the project</li>
            <li>The specific circumstances of the refund request</li>
            <li>The impact on other investors and project stakeholders</li>
            <li>Any applicable regulatory requirements</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Please note that refunds approved after the cooling-off period may be subject to processing fees and may not include any returns that have accrued.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Project Cancellation or Significant Changes</h2>
          <p className="text-gray-700 mb-3">
            If an agricultural project is cancelled before it begins operations, or if there are significant changes to the project's scope, timeline, or expected returns that materially alter its nature, AgriPath will:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Notify all affected investors promptly</li>
            <li>Provide detailed information about the cancellation or changes</li>
            <li>Outline available options, which may include:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>Full or partial refund of the investment amount</li>
                <li>Reallocation of the investment to another suitable project</li>
                <li>Continuation with the modified project parameters</li>
              </ul>
            </li>
          </ul>
          <p className="text-gray-700 mt-3">
            In cases of project cancellation, we will make reasonable efforts to return the original investment amount, less any incurred costs directly related to the project that cannot be recovered.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Refund Process and Timeline</h2>
          <p className="text-gray-700 mb-3">
            For approved refunds, the following process and timeline applies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Refund requests must be submitted in writing via the platform or by emailing <a href="mailto:refunds@agripath.co" className="text-green-600 hover:underline">refunds@agripath.co</a></li>
            <li>All refund requests will be acknowledged within 3 business days</li>
            <li>The evaluation process for refund requests outside the cooling-off period may take up to 14 business days</li>
            <li>Approved refunds will be processed within 5-10 business days of approval</li>
            <li>Refunds will typically be issued using the original payment method used for the investment</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Please note that the processing time for refunds may vary depending on your financial institution or payment provider.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Non-Refundable Items</h2>
          <p className="text-gray-700 mb-3">
            The following items are generally non-refundable:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Platform fees and transaction fees associated with the investment</li>
            <li>Third-party payment processing fees</li>
            <li>Any returns or profits already distributed to investors</li>
            <li>Investments where the cooling-off period has expired and funds have been deployed to projects</li>
            <li>Investments in projects that have explicitly stated non-refundable terms in their specific terms and conditions (which would be clearly disclosed prior to investment)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Fraudulent or Unauthorized Transactions</h2>
          <p className="text-gray-700 mb-3">
            If you believe an unauthorized or fraudulent transaction has been made using your account, please:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Contact our support team immediately at <a href="mailto:security@agripath.co" className="text-green-600 hover:underline">security@agripath.co</a></li>
            <li>Provide all relevant details regarding the transaction</li>
            <li>Follow any additional security steps as advised by our team</li>
          </ul>
          <p className="text-gray-700 mt-3">
            We take security incidents seriously and will investigate all reports promptly. If a transaction is confirmed to be fraudulent or unauthorized, we will process a full refund and take appropriate measures to secure your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Disputes and Resolution</h2>
          <p className="text-gray-700 mb-3">
            If you are dissatisfied with our decision regarding a refund request, you may:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Request a review of the decision by contacting our customer service team</li>
            <li>Provide any additional information or documentation that may support your case</li>
            <li>Escalate the matter to our dispute resolution team if necessary</li>
          </ul>
          <p className="text-gray-700 mt-3">
            We aim to resolve all disputes fairly and in accordance with our policies and applicable regulations. In certain jurisdictions, you may also have the right to refer unresolved disputes to alternative dispute resolution mechanisms or relevant financial regulators.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Changes to This Policy</h2>
          <p className="text-gray-700 mb-3">
            AgriPath reserves the right to modify this Refund Policy at any time. Any changes will be effective immediately upon posting the updated policy on our platform. We will notify users of significant changes through appropriate channels, such as email notifications or platform announcements.
          </p>
          <p className="text-gray-700 mb-3">
            The updated policy will apply to investments made after the policy change. Investments made prior to any policy changes will be governed by the policy that was in effect at the time of investment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Contact Information</h2>
          <p className="text-gray-700 mb-3">
            If you have any questions, concerns, or requests regarding this Refund Policy, please contact us at:
          </p>
          <p className="text-gray-700">
            Refunds Department<br />
            Email: <a href="mailto:refunds@agripath.co" className="text-green-600 hover:underline">refunds@agripath.co</a><br />
            Address: AgriPath Headquarters, 123 Agriculture Lane, Farmington, AG 12345<br />
            Phone: +1 (555) 123-4567
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
};

export default RefundPolicyPage; 