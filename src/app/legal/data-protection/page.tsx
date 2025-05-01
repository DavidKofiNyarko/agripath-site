'use client';
import React from 'react';
import LegalPageLayout from '../../components/LegalPageLayout';

const DataProtectionPage = () => {
  return (
    <LegalPageLayout title="Data Protection Policy" lastUpdated="February 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Introduction</h2>
          <p className="text-gray-700 mb-3">
            AgriPath ("we," "our," or "us") is committed to protecting the personal data of our users and ensuring compliance with applicable data protection laws. This Data Protection Policy outlines our practices concerning the collection, processing, and protection of personal data.
          </p>
          <p className="text-gray-700 mb-3">
            This policy applies to all personal data processed by AgriPath, regardless of the medium on which that information is stored or whether it relates to past or present users, employees, workers, customers, clients or supplier contacts, website users, or any other data subject.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Data Protection Principles</h2>
          <p className="text-gray-700 mb-3">
            We adhere to the following data protection principles:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><span className="font-semibold">Lawfulness, Fairness, and Transparency:</span> We process personal data lawfully, fairly, and in a transparent manner.</li>
            <li><span className="font-semibold">Purpose Limitation:</span> We collect personal data for specified, explicit, and legitimate purposes and do not process it in a manner incompatible with those purposes.</li>
            <li><span className="font-semibold">Data Minimization:</span> We ensure that personal data is adequate, relevant, and limited to what is necessary for the purposes for which it is processed.</li>
            <li><span className="font-semibold">Accuracy:</span> We take reasonable steps to ensure that personal data is accurate and, where necessary, kept up to date.</li>
            <li><span className="font-semibold">Storage Limitation:</span> We keep personal data in a form that permits identification of data subjects for no longer than necessary for the purposes for which it is processed.</li>
            <li><span className="font-semibold">Integrity and Confidentiality:</span> We process personal data in a manner that ensures appropriate security, including protection against unauthorized or unlawful processing and against accidental loss, destruction, or damage.</li>
            <li><span className="font-semibold">Accountability:</span> We are responsible for and can demonstrate compliance with the data protection principles.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Data Protection Officer</h2>
          <p className="text-gray-700 mb-3">
            AgriPath has appointed a Data Protection Officer (DPO) who is responsible for overseeing our data protection strategy and implementation to ensure compliance with applicable regulations. The DPO's responsibilities include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Informing and advising AgriPath and its employees about their obligations under data protection laws</li>
            <li>Monitoring compliance with data protection laws and AgriPath's data protection policies</li>
            <li>Providing advice regarding data protection impact assessments</li>
            <li>Cooperating with supervisory authorities</li>
            <li>Acting as a contact point for data subjects on privacy matters</li>
          </ul>
          <p className="text-gray-700 mt-3">
            You can contact our DPO at <a href="mailto:dpo@agripath.co" className="text-green-600 hover:underline">dpo@agripath.co</a> or through the contact information provided at the end of this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Lawful Basis for Processing</h2>
          <p className="text-gray-700 mb-3">
            We will only process personal data where we have a lawful basis to do so. The lawful bases we may rely on include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><span className="font-semibold">Consent:</span> The individual has given clear consent for us to process their personal data for a specific purpose.</li>
            <li><span className="font-semibold">Contract:</span> The processing is necessary for a contract we have with the individual, or because they have asked us to take specific steps before entering into a contract.</li>
            <li><span className="font-semibold">Legal Obligation:</span> The processing is necessary for us to comply with the law (not including contractual obligations).</li>
            <li><span className="font-semibold">Vital Interests:</span> The processing is necessary to protect someone's life.</li>
            <li><span className="font-semibold">Legitimate Interests:</span> The processing is necessary for our legitimate interests or the legitimate interests of a third party, unless there is a good reason to protect the individual's personal data which overrides those legitimate interests.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Data Subject Rights</h2>
          <p className="text-gray-700 mb-3">
            We respect the rights of data subjects and ensure that individuals can exercise their rights regarding their personal data. These rights include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><span className="font-semibold">Right to be Informed:</span> Individuals have the right to be informed about the collection and use of their personal data.</li>
            <li><span className="font-semibold">Right of Access:</span> Individuals have the right to request access to their personal data and supplementary information.</li>
            <li><span className="font-semibold">Right to Rectification:</span> Individuals have the right to have inaccurate personal data rectified or completed if it is incomplete.</li>
            <li><span className="font-semibold">Right to Erasure:</span> Individuals have the right to have their personal data erased in certain circumstances.</li>
            <li><span className="font-semibold">Right to Restrict Processing:</span> Individuals have the right to request the restriction or suppression of their personal data.</li>
            <li><span className="font-semibold">Right to Data Portability:</span> Individuals have the right to obtain and reuse their personal data for their own purposes across different services.</li>
            <li><span className="font-semibold">Right to Object:</span> Individuals have the right to object to the processing of their personal data in certain circumstances.</li>
            <li><span className="font-semibold">Rights Related to Automated Decision Making and Profiling:</span> Individuals have rights related to automated individual decision-making (making a decision solely by automated means without human involvement) and profiling (automated processing of personal data to evaluate certain things about an individual).</li>
          </ul>
          <p className="text-gray-700 mt-3">
            To exercise any of these rights, please contact us using the information provided in the "Contact Information" section.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Data Security</h2>
          <p className="text-gray-700 mb-3">
            We have implemented appropriate technical and organizational measures to ensure a level of security appropriate to the risk of processing personal data. These measures include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Encryption of personal data where appropriate</li>
            <li>Ability to ensure the ongoing confidentiality, integrity, availability, and resilience of processing systems and services</li>
            <li>Ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident</li>
            <li>Process for regularly testing, assessing, and evaluating the effectiveness of technical and organizational measures for ensuring the security of the processing</li>
            <li>Measures to ensure that personnel are trained on data protection and security practices</li>
            <li>Access controls to ensure that only authorized personnel have access to personal data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Data Breach Procedures</h2>
          <p className="text-gray-700 mb-3">
            We have procedures in place to detect, report, and investigate personal data breaches. In the case of a breach that is likely to result in a risk to the rights and freedoms of individuals, we will:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Notify the appropriate supervisory authority without undue delay and, where feasible, not later than 72 hours after becoming aware of the breach</li>
            <li>Notify the affected individuals without undue delay if the breach is likely to result in a high risk to their rights and freedoms</li>
            <li>Document all breaches, including the facts relating to the breach, its effects, and the remedial action taken</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Data Protection Impact Assessments</h2>
          <p className="text-gray-700 mb-3">
            We conduct Data Protection Impact Assessments (DPIAs) when processing is likely to result in a high risk to the rights and freedoms of individuals. DPIAs help us identify and minimize data protection risks and are mandatory in certain circumstances, such as:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>When using new technologies</li>
            <li>When the processing is likely to result in a high risk to the rights and freedoms of individuals</li>
            <li>When processing involves systematic and extensive profiling</li>
            <li>When processing special categories of data on a large scale</li>
            <li>When systematically monitoring publicly accessible areas on a large scale</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Data Transfers</h2>
          <p className="text-gray-700 mb-3">
            We may transfer personal data to countries outside the jurisdiction in which it was collected. When we transfer personal data internationally, we ensure that appropriate safeguards are in place to protect the data in accordance with applicable data protection laws. These safeguards may include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Standard contractual clauses approved by relevant data protection authorities</li>
            <li>Binding corporate rules for transfers within a corporate group</li>
            <li>Adequacy decisions issued by relevant data protection authorities</li>
            <li>Derogations in specific situations, such as explicit consent, contractual necessity, or important reasons of public interest</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Records of Processing Activities</h2>
          <p className="text-gray-700 mb-3">
            We maintain records of our processing activities, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Name and contact details of AgriPath, our representatives, and the Data Protection Officer</li>
            <li>Purposes of the processing</li>
            <li>Description of the categories of data subjects and personal data</li>
            <li>Categories of recipients to whom the personal data has been or will be disclosed</li>
            <li>Details of international transfers of personal data, including documentation of appropriate safeguards</li>
            <li>Time limits for erasure of different categories of data where possible</li>
            <li>General description of technical and organizational security measures</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Data Protection Training</h2>
          <p className="text-gray-700 mb-3">
            We provide data protection training to all employees who have access to personal data. This training covers:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>The principles of data protection</li>
            <li>The rights of data subjects</li>
            <li>The lawful bases for processing</li>
            <li>Data security procedures</li>
            <li>How to identify and report data breaches</li>
            <li>The consequences of failing to comply with data protection policies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Third-Party Processors</h2>
          <p className="text-gray-700 mb-3">
            We may engage third-party processors to process personal data on our behalf. When we do so, we:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Conduct due diligence to ensure the processor provides sufficient guarantees to implement appropriate technical and organizational measures</li>
            <li>Enter into a written contract that sets out the subject matter and duration of the processing, the nature and purpose of the processing, the type of personal data and categories of data subjects, the obligations and rights of AgriPath as the data controller</li>
            <li>Regularly audit and review the processor's compliance with data protection requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Data Retention</h2>
          <p className="text-gray-700 mb-3">
            We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements. To determine the appropriate retention period for personal data, we consider:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>The amount, nature, and sensitivity of the personal data</li>
            <li>The potential risk of harm from unauthorized use or disclosure of the personal data</li>
            <li>The purposes for which we process the personal data and whether we can achieve those purposes through other means</li>
            <li>The applicable legal, regulatory, tax, accounting, or other requirements</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Our Data Retention Policy provides specific retention periods for different categories of data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Changes to This Policy</h2>
          <p className="text-gray-700 mb-3">
            We may update this Data Protection Policy from time to time to reflect changes in our practices or to comply with legal requirements. We will notify you of any material changes to this policy by posting the updated policy on our website or by other appropriate means. We encourage you to review this policy periodically to stay informed about our data protection practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Contact Information</h2>
          <p className="text-gray-700 mb-3">
            If you have any questions, concerns, or requests regarding this Data Protection Policy or our data protection practices, please contact our Data Protection Officer:
          </p>
          <p className="text-gray-700">
            Data Protection Officer<br />
            Email: <a href="mailto:dpo@agripath.co" className="text-green-600 hover:underline">dpo@agripath.co</a><br />
            Address: AgriPath Headquarters, 123 Agriculture Lane, Farmington, AG 12345<br />
            Phone: +1 (555) 123-4567
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
};

export default DataProtectionPage; 