<template>
    <Blog>
        <Banner title="Terms of Service" firstMessage="Welcome to BetaMe!"  secondMessage="Please read through our terms of service before joining our community." />
        <br>
        <div class="row">
            <div class="col-2">
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#theGist')">The Gist</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#termsService')">Terms of Service</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#whosWho')">Who’s Who</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#yourAccount')">Your Account</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#minimumAgeRequirements')">Minimum Age Requirements</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#responsibilityVisitorsUsers')">Responsibility of Visitors and Users</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#generalRepresentationWarranty')">General Representation and Warranty</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#copyrightInfringementDMCAPolicy')">Copyright Infringement and DMCA Policy</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#intellectualProperty')">Intellectual Property</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#changes')">Changes</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#termination')">Termination</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#disclaimerWarranties')">Disclaimer of Warranties</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#limitationLiability')">Limitation of Liability</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#indemnification')">Indemnification</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#translation')">Translation</a></p>
                <p><a class="beta-link" href="#" v-scroll-to="scrollToSection('#miscellaneous')">Miscellaneous</a></p>
            </div>
            <div class="col-10">
                <p>This terms of service was adapted from one created by <a href="https://automattic.com/" class="beta-link" target="_blank">Automattic</a>. They have very kindly created theirs with a Creative Commons Sharealike License. I went through the document and revised it so that it reflects what we believe! Please find the terms below:</p>

                <h3 class="beta-title" id="theGist">The Gist</h3>
                <p>We at BetaMe are on a mission to build a community for writers who encourage each other on this journey and share both their wisdom and their humility so we can all learn together. Sharing our writing can be a very personal and difficult thing to do and we will try to do our best to make it a fullfilling experience for you. We want you to feel free to share your work and sincerly hope you enjoy your time as part of our community.</p>
                <p>As a community, we will not always get everything right first time. We hope that you can have patience with us as we improve our services. We gratefully appreciate feedback and take the time to consider all requests so please feel free to reach out to us.</p>
                <p>These Terms of Service (“Terms”) describe our commitments to you, and your rights and responsibilities when using our services. Please read them carefully and reach out to us if you have any questions.</p>

                <h3 class="beta-title" id="termsService">Terms of Service</h3>
                <p>Our services are offered subject to your acceptance, without modification, of all of the terms and conditions contained herein and all other operating rules, policies (including, without limitation, <a class="beta-link" href="/#/privacy">BetaMe’s Privacy Policy</a>), and procedures that may be published from time to time by BetaMe (collectively, the “Agreement”). You agree that we may automatically upgrade our services, and the Agreement will apply to any upgrades.</p>
                <p>Please read the Agreement carefully before accessing or using our services. By accessing or using any part of our services, you agree to become bound by the Agreement. If you do not agree to all the terms of the Agreement, then you may not access or use our services.</p>

                <h3 class="beta-title" id="whosWho">Who’s Who</h3>
                <p>Throughout these Terms, “you” applies to both individuals and entities that access or use our services. If you are an individual using our services on behalf of an entity, you represent and warrant that you have the authority to bind that entity to the Agreement and that by using our service(s), you are accepting the Agreement on behalf of that entity.</p>

                <h3 class="beta-title" id="yourAccount">Your Account</h3>
                <p>Where use of our services requires an account, you agree to provide us with complete and accurate information when you register for an account. This is important because sometimes we may need to send you notable updates (for example, about changes to our Terms of Service or Privacy Policy), or we may want to let you know about and make informed choices in response to legal inquiries or complaints.</p>
                <p>You will be solely responsible and liable for any activity that occurs under your account. You are responsible for keeping your account information up-to-date and for keeping your password secure.</p>
                <p>You are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under your account and any other actions taken in connection with our services. You shall not share or misuse your access credentials. You must immediately notify us of any unauthorized uses of your account, store, or website, or of any other breach of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.</p>
                <p>When you create a BetaMe.io account, we consider that to be an inquiry about our services, which means that we may contact you to share more details about what we have to offer. Don’t worry — if you aren’t interested in learning more, you can opt out of marketing communication.</p>

                <h3 class="beta-title" id="minimumAgeRequirements">Minimum Age Requirements</h3>
                <p>Our services are not directed to children. Access to and use of our services is only for those over the age of 13 (or 16 in the European Union). If you are younger than this, you may not register for or use our services. Any person who registers as a user or provides their personal information to our services represents that they are 13 years of age or older (or 16 years or older in the European Union).</p>

                <h3 class="beta-title" id="responsibilityVisitorsUsers">Responsibility of Visitors and Users</h3>
                <p>We have not reviewed, and cannot review, all of the content posted to BetaMe by users or anyone else (“Content”) and are not responsible for any use or effects of such Content. So, for example:</p>
                <ul>
                    <li>We do not endorse any Content or represent that Content is accurate, useful, or non-harmful. Content could be offensive, indecent, or objectionable; include technical inaccuracies, typographical mistakes, or other errors; or violate or infringe the privacy, publicity rights, intellectual property rights, or other proprietary rights of third parties.</li>
                    <li>If you post Content or comment on BetaMe, you are entirely responsible for the Content, and any harm resulting from, that Content or your conduct.</li>
                    <li>We disclaim any responsibility for any harm resulting from anyone’s use or downloading of Content. If you access or use any Content, you are responsible for taking precautions as necessary to protect yourself and your computer systems from viruses, worms, Trojan horses, and other harmful or destructive content.</li>
                </ul>
                <p>We also have not reviewed, and cannot review, all of the material, made available through links on BetaMe.</p>

                <h3 class="beta-title" id="generalRepresentationWarranty">General Representation and Warranty</h3>
                <p>You represent and warrant that your use of our services:</p>
                <ul>
                    <li>Will be in strict accordance with these Terms;</li>
                    <li>Will comply with all applicable laws and regulations (including, without limitation, all applicable laws regarding online conduct and acceptable content, privacy, data protection, and the transmission of technical data exported from the country in which you reside);</li>
                    <li>Will not use the services for any unlawful purposes, to publish illegal content, or in furtherance of illegal activities;</li>
                    <li>Will not infringe or misappropriate the intellectual property rights of any third party;</li>
                    <li>Will not overburden BetaMe’s systems, as determined by us in our sole discretion;</li>
                    <li>Will not disclose sensitive personal information of others;</li>
                    <li>Will not be used to send spam or bulk unsolicited messages;</li>
                    <li>Will not interfere with, disrupt, or attack any service or network; and</li>
                    <li>Will not be used to create, distribute, or enable material that is – or that facilitates or operates in conjunction with – malware, spyware, adware, or other malicious programs or code.</li>
                </ul>

                <h3 class="beta-title" id="copyrightInfringementDMCAPolicy">Copyright Infringement and DMCA Policy</h3>
                <p>As we ask others to respect our intellectual property rights, we respect the intellectual property rights of others. If you believe that material uploaded to BetaMe violates your copyright, please notify us immediately. We will respond to all such notices, including as required or appropriate by removing the infringing material or disabling all links to the infringing material. We will terminate a visitor’s access to and use of the website if, under appropriate circumstances, the visitor is determined to be a repeat infringer of the copyrights or other intellectual property rights of BetaMe or others.</p>

                <h3 class="beta-title" id="intellectualProperty">Intellectual Property</h3>
                <p>BetaMe does not make any claims to ownership of the intellectual property uploaded to the website.</p>

                <h3 class="beta-title" id="changes">Changes</h3>
                <p>We are constantly updating our services and that means sometimes we have to change the legal terms under which our services are offered. These Terms may only be modified by the posting by BetaMe of a revised version. If we make changes that are material, we will let you know by posting on BetaMe, or by sending you an email or other communication before the changes take effect. The notice will designate a reasonable period of time after which the new terms will take effect. If you disagree with our changes, then you should stop using our services within the designated notice period, or once the changes become effective. Your continued use of our services will be subject to the new terms. However, any dispute that arose before the changes shall be governed by the Terms (including the binding individual arbitration clause) that were in place when the dispute arose.</p>

                <h3 class="beta-title" id="termination">Termination</h3>
                <p>We may terminate your access to all or any part of our services at any time, with or without cause, with or without notice, effective immediately. We have the right (though not the obligation) to, in our sole discretion, (i) reclaim your username or account due to prolonged inactivity, (ii) refuse or remove any content that, in our reasonable opinion, violates any BetaMe policy or is in any way harmful or objectionable, (iii) terminate or deny access to and use of any of our services to any individual or entity for any reason.</p>
                <p>If you wish to terminate the Agreement or your BetaMe.io account, you may simply discontinue using our services.</p>
                <p>All provisions of the Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>

                <h3 class="beta-title" id="disclaimerWarranties">Disclaimer of Warranties</h3>
                <p>Our services are provided “as is.” BetaMe and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement. Neither BetaMe, nor its suppliers and licensors, makes any warranty that our services will be error free or that access thereto will be continuous or uninterrupted. You understand that you download from, or otherwise obtain content or services through, our services at your own discretion and risk.</p>

                <h3 class="beta-title" id="limitationLiability">Limitation of Liability</h3>
                <p class="important">In no event will BetaMe, or its suppliers or licensors, be liable with respect to any subject matter of the Agreement under any contract, negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement for substitute products or services; (iii) for interruption of use or loss or corruption of data; or (iv) for any amounts of money under the Agreement during the twelve (12) month period prior to the cause of action, whichever is greater. BetaMe shall have no liability for any failure or delay due to matters beyond their reasonable control. The foregoing shall not apply to the extent prohibited by applicable law.</p>

                <h3 class="beta-title" id="indemnification">Indemnification</h3>
                <p>You agree to indemnify and hold harmless BetaMe, its contractors, and its licensors, and their respective directors, officers, employees, and agents from and against any and all losses, liabilities, demands, damages, costs, claims, and expenses, including attorneys’ fees, arising out of or related to your use of our services, including but not limited to your violation of the Agreement, Content that you post, and any activities conducted through BetaMe.</p>

                <h3 class="beta-title" id="translation">Translation</h3>
                <p>These Terms were originally written in English (US). We may translate these terms into other languages. In the event of a conflict between a translated version of these Terms and the English version, the English version will control.</p>

                <h3 class="beta-title" id="miscellaneous">Miscellaneous</h3>
                <p>The Agreement constitutes the entire agreement between BetaMe and you concerning the subject matter hereof. If any part of the Agreement is held invalid or unenforceable, that part will be construed to reflect the parties’ original intent, and the remaining portions will remain in full force and effect. A waiver by either party of any term or condition of the Agreement or any breach thereof, in any one instance, will not waive such term or condition or any subsequent breach thereof.</p>
                <p>You may assign your rights under the Agreement to any party that consents to, and agrees to be bound by, its terms and conditions; BetaMe may assign its rights under the Agreement without condition. The Agreement will be binding upon and will inure to the benefit of the parties, their successors and permitted assigns.</p>
            </div>
        </div>
    </Blog>
</template>

<script>
import Blog from '../../layouts/Blog.vue'
import Banner from '../../components/Banner'

export default {
    name: 'TermsOfService',
    components: {
        Blog,
        Banner
    },
    methods: {
        scrollToSection(id) {
            return {
                el: id,
                duration: 500,
                easing: 'linear',
                offset: -100,
            }
        }
    }
}
</script>

<style scoped>
.terms h3 {
    margin-top: 60px;
    margin-bottom: 15px;
}

.terms h5 {
    margin-top: 30px;
}
</style>