import React from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class PrivacyPolicy extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.pnTitle}>Intellicare App Privacy Notice</Text>
        <ScrollView style={styles.tcContainer}>
          <Text style={{fontWeight: 'bold', marginTop: 10}}>
            Hi Intellicare App User,
          </Text>
          <Text style={styles.pnP}>
            Intellicare values your privacy and this notice are meant to help
            you understand how we protect the information you provide.{' '}
          </Text>
          <Text style={styles.pnP}>
            Our people are working hard to ensure you remain in control of your
            data. So please take time to read this before you continue signing
            up.
          </Text>
          <Text style={{fontWeight: 'bold'}}>What we collect and why.</Text>
          <Text style={styles.pnP}>
            We built this App to provide you with the most efficient services we
            can offer in the market, improve our services and personalize them
            to your needs to the extent possible. This App allows us to provide
            you information on your HMO coverage, our partner medical
            institutions and our Company and to interact with you directly. But
            to do this we need the following information from your end
          </Text>
          <Text style={styles.pnNL}>1. Your name, sex, and age</Text>
          <Text style={styles.pnNL}>2. Your address</Text>
          <Text style={styles.pnNL}>3. Your contact number</Text>
          <Text style={styles.pnNL}>4. Intellicare Account Number</Text>
          <Text style={styles.pnNL}>5. Intellicare Card Number</Text>
          <Text style={styles.pnNL}>6. Copy of a Government Issued ID</Text>
          <Text style={styles.pnNL}>7. Copy of your Intellicare Card ID</Text>
          <Text style={styles.pnP}>
            This set of information will be used further for other purposes.
            Specifically, we collect your name, sex, age, address, Intellicare
            Details, and Identification Cards to verify your identity and
            membership in the Intellicare Network and to reach out to you in
            cases of public service announcements. Collecting your contact
            details like mobile number and email allows us to send you
            confirmation of registration in this App, as well as updates and
            materials you may like. For example, if there are updates in our
            services, you will know them with a notification sent via this App.
            Please note, we will only send you marketing materials if you give
            your specific consent, which you will see later on.
          </Text>
          <Text style={styles.pnP}>
            All those we collect from you are treated as private and
            confidential.
          </Text>
          <Text style={{fontWeight: 'bold'}}>
            Reviewing, Updating, Removing and deleting your information
          </Text>
          <Text style={styles.pnP}>
            You can request to update and delete App account information by
            sending your request to our data protection officer, via
            dpo@intellicare.net.ph.
          </Text>
          <Text style={styles.pnP}>
            Note, however, that deleting your account information will
            automatically result in the deactivation of your access to this App.
          </Text>
          <Text style={styles.pnP}>
            To be clear, your HMO information is treated separately and is
            subject to the Privacy Policy of Intellicare and the Benefit Plan of
            your Employer. In other words, deleting App account information does
            not result in the deletion of your HMO information as the latter is
            governed by the Benefit Plan provided by your employer. But if you
            want to withdraw your consent to our use and/or disclosure of your
            personal data for the delivery of HMO services, just bear in mind
            that we may no longer be able to serve you nor provide you with the
            products and services that you require.
          </Text>
          <Text style={{fontWeight: 'bold'}}>
            When Intellicare shares your information
          </Text>
          <Text style={styles.pnP}>
            Intellicare will only share your information if:
          </Text>
          <Text style={styles.pnNL}>1. You gave your consent;</Text>
          <Text style={styles.pnNL}>
            2. The processing of personal information is necessary and is
            related to the fulfillment of the HMO contract with your Employer,
          </Text>
          <Text style={styles.pnNL}>
            3. The processing is necessary for compliance with a legal
            obligation to which Intellicare or your Employer is subject,
          </Text>
          <Text style={styles.pnNL}>
            4. The processing is necessary to protect your vitally important
            interests, including life and health,
          </Text>
          <Text style={styles.pnNL}>
            5. The processing is necessary in order to respond to national
            emergency, to comply with the requirements of public order and
            safety, or to fulfill functions of public authority which
            necessarily includes the processing of personal data for the
            fulfillment of its mandate; or
          </Text>
          <Text style={styles.pnNL}>
            6. The processing is necessary for the purposes of the legitimate
            interests pursued by Intellicare or your Employer or by a third
            party or parties to whom the data are disclosed, except where such
            interests are overridden by fundamental rights and freedoms of the
            data subject which require protection under the Philippine
            Constitution.
          </Text>
          <Text style={{fontWeight: 'bold'}}>To whom we may Disclose</Text>
          <Text style={styles.pnP}>
            Your information may be disclosed subject to the above-stated
            conditions only and the requirements of the Data Privacy Act to:
          </Text>
          <Text style={styles.pnNL}>
            1. Your Human Resource Department as far as HMO utilization is
            concerned and your eligibility as a member of the Intellicare
            Network
          </Text>
          <Text style={styles.pnNL}>
            2. Courts, Law Enforcement Authorities and Regulators but only upon
            their lawful orders
          </Text>
          <Text style={styles.pnNL}>
            3. Lawyers or any person whenever there is a need to protect the
            rights of Intellicare and your Employer; provided that the
            information is absolutely necessary.
          </Text>
          <Text style={{fontWeight: 'bold'}}>
            We build security into our services to protect your information
          </Text>
          <Text style={styles.pnP}>
            We strive to build the best security precautions to ensure that the
            information you provide is protected against unauthorized or
            unintended access. We can assure you that internationally acceptable
            standards are in place so you will feel comfortable trusting us with
            your data.
          </Text>
          <Text style={{fontWeight: 'bold'}}>Retention</Text>
          <Text style={styles.pnP}>
            Your information is retained for the period of time for as long as
            the purpose for which the personal data was collected continues.
          </Text>
          <Text style={styles.pnP}>
            We will destroy the personal data thereafter, unless it is necessary
            to retain the personal data longer for our satisfaction and
            compliance of legal, regulatory or accounting requirements, or to
            protect our interest.
          </Text>
          <Text style={{fontWeight: 'bold'}}>Complaints</Text>
          <Text style={styles.pnP}>
            If you have complaints, our lines are open. Kindly contact our Data
            Protection Officer via email via dpo@intellicare.net.ph.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //  Privacy Notice Style
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 20,
    padding: 16,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  pnTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#5fb650',
    height: 40,
    top: 8,
  },
  pnP: {
    fontSize: 12,
    padding: 5,
  },
  pnL: {
    padding: 10,
    fontSize: 12,
  },
  pnNL: {
    fontSize: 12,
    marginLeft: 10,
    padding: 2,
  },
  pnContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
    borderWidth: 0.5,
  },
  pnButton: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
  },
  pnButtonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
  },
  pnButtonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    alignSelf: 'center',
  },
  headerSubheader: {
    fontSize: 12,
    color: '#a5d69c',
  },
});
