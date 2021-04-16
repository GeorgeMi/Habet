import * as React from 'react';
import { Header } from './Header';
import * as Translate from 'react-translate-component';
import en from './languages/en';
import it from './languages/it';
import ro from './languages/ro';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

export class PrivacyPolicy extends React.Component {
    constructor(props) {
        super(props);

        this.reloadPage = this.reloadPage.bind(this);
    }

    public reloadPage() {
        window.location.reload(false);
    }

    render() {
        var lang = read_cookie('lang')

        return (
            <div>
                <main id="main">
                    <div>

                        <Header reloadPage={this.reloadPage}/>
                        <section className="ftco-section contact-section bg-light">
                            <div className="container">
                                <div className="bg-white p-5" style={{ textAlign: 'justify' }}>
                                    <div className="row justify-content-center mb-3 pb-3">
                                        <div className="col-md-12 heading-section text-center">
                                            <h2 className="mb-4"><Translate content='privacyPolicy.Title' /></h2>
                                        </div>
                                    </div>

                                    {
                                        lang == 'ro' &&
                                        <div>
                                            <p>Aplicând cerințele legilor în vigoare nr. 677/2001 și 506/2014 privind protecția persoanelor cu privire la prelucrarea datelor cu caracter personal și protecția vieții private în sectorul comunicațiilor electronice. Proprietarul, Gabriel Habet SRL având sediul social în Județul Iași, Sat Țigănași, Comuna Țigănași, Strada Principală, Nr. 126 cu număr de ordine în Registrul Comerțului J22/2726/2019, cod unic de înregistrare fiscală RO41533477 are obligația de a administra în condiții de siguranță și numai în scopuri precis specificate datele dumeavoastră personale pe care le furnizați în momentul realizări comenzilor.</p>
                                            <p>Clientul nu este obligat să furnizeze datele cerute, dar acest lucru fiind totuși necesar pentru finalizarea comenzii și plasarea de noi oferte și reduceri din partea magazinului nostru. În cazul în care refuzați să furnizați aceste date, apare imposibilitatea procesării și livrării comenzilor către client, lucru ce oprește comandă dumneavoastră.
                                            Modificarea sau ștergerea datelor personale este garantată conform legii nr. 677/2001, iar accesul asupra acestor modificări este realizat pe baza de user și parolă predate în momentul realizării contului.
Drepturile de opunere asupra prelucrării datelor dumneavoastră sunt la fel garantate prin lege, iar solicitarea ștergerii datelor este realizată de către Proprietar, printr-o cerere înregistrată.<br />
                                        În momentul în care unele din datele dumeavoastră sunt incorecte va rugăm să ne anunțați imediat prin orice mijloc de comunicare posibil. </p>
                                            <h3>Politică de confidențialitate GDPR cu privire la prelucrarea datelor cuprinde următoarele informații:</h3>
                                            <h4>1.	Ce reprezintă datele cu caracter general?</h4>
                                            <p>Datele cu caracter personal, sunt datele pe care, de regulă le colectăm direct de la dumneavoastră astfel încât să aveți controlul asupra informațiilor pe care ni le oferiți.</p>
                                            <p>De exemplu, primim informații de la dumneavoastră astfel:<br />
                                        Atunci când vă creați un cont pe site-ul nostru www.gabrielhabet.com, ne transmiteți: adresa de e-mail.<br />
                                            În secțiunea dumneavoastră personală (Contul meu) aveți posibilitatea să adăugați informații suplimentare cum ar fi: numele, prenumele, număr de telefon, adrese de livrare.<br />
                                                În momentul când plasați o comandă, ne furnizați informații precum: produsul dorit, numele și prenumele, adresa de livrare, detalii de facturare, metodă de plată, număr de telefon, datele cardului bancar etc.</p>
                                            <h4>2.	Ce tipuri de date cu caracter personal colectăm?</h4>
                                            <p>Colectăm urmăroarele date cu caracter personal pentru anumite scopuri și servicii cum ar fi:</p>
                                            <ul>
                                                <li><b>nume și prenume:</b> pentru a putea realiza livrarea produselor comandate, avem nevoie de aceste date;</li>
                                                <li><b>e-mail:</b> pentru a realiza o comunicare între platforma și user, adresa de e-mail o folosim pentru a vă confirmă comandă și pentru a vă informa despre stadiul comenzilor;</li>
                                                <li><b>număr de telefon:</b> avem nevoie de numărul de telefon pentru confirmarea comenzii și pentru a stabili și alte detalii legate de comandă plasată.</li>
                                                <li><b>adresa de livrare:</b> pentru a reuși să livrăm comandă, avem nevoie de comunicarea adresei corecte, în procesul de comandă</li>
                                                <li><b>adresa de facturare:</b> pentru a reuși să facem factură fiscală, avem nevoie de comunicare corectă a datelor de facturare </li>
                                                <li><b>prelucrarea comenzilor și soluționarea lor:</b> prelucrarea, validarea, soluționare sau anularea comenzilor și/sau a bunurilor și serviciilor achiziționate. </li>
                                                <li><b>rambursarea banilor:</b> contravaloarea produselor conform prevederilor legalee existente</li>
                                                <li><b>rambursarea produselor:</b> returnarea produselor conform prevederilor legale existente </li>
                                            </ul>
                                            <h4>3.	Care este scopul și temeiul prelucrării datelor și cum folosim informațiile tale personale ?</h4>
                                            <p>Datele pe care "user/clientul" ni le oferi voluntar, cele pe care le trimite prin plasarea unei comenzi în temeiul legal este acela de a face demersuri la cererea persoanei vizate înainte de încheierea unui contract (art. 6 alin. (1) lit. b din Regulamentul (UE) 679/2016).<br />
                                                Aceste date, le folosim pentru a reuși să emite factură fiscală și să face livrarea corectă și corespunzătoare a produselor.</p>
                                            <p>În acest sens, ne asigurăm întotdeauna că aceste prelucrări sunt efectuate cu respectarea drepturilor și libertăților dumneavoastră, iar deciziile luate pe baza acestora nu au efecte legale asupra dumneavoastră și nu vă afectează similar într-o măsură semnificativă. Comunicările de marketing sunt transmise pe consimțământul dumneavoastră prealabil. </p>
                                            <p>De asemenea, vă puteți răzgândi și retrage consimțământul în orice moment, prin:<br />
                                                    - Modificarea setărilor din contul de client;<br />
                                                        - Dezabonarea de la mesajel/email-urile pe care le primiți de la noi;<br />
                                                            - Contactarea gabrielhabet.com.<br />
                                            </p>
                                            <p>Sunt și anumite situații în care ne desfășurăm activitățile de marketing pe interesul nostru legitim de a ne promova și dezvoltă activitatea comercială, conform Legii nr 506/2004, Art.12 (2). În situațiile de așa natură, unde folosim informații cu privire la dumneavoastră pentru un interes legitim al nostru, avem în vedere să luăm toate măsurile necesare pentru că drepturile și libertățile dumneavoastră fundamentale să nu fie afectate.</p>
                                            <h4>4.	Care este temeiul legal prin care colectăm aceste date personale ?</h4>
                                            <p>Temeiul legal este acela de a face demersuri la cererea persoanei vizate prin accesare, înainte de încheierea unui contract (art. 6 alin. (1) lit. b din Regulamentul (UE) 679/2016).</p>
                                            <p>Datele pe care le colectăm automat prin folosirea cookie-urilor sau a altor tehnologii similare, temeiul pentru prelucrare este consimțământul. Odată cu accesarea site-ului, îți dai în mod valabil consimțământul asupra prelucrării informațiilor necesare pentru utilizare.</p>
                                            <h4>5.	Partajarea datelor cu caracter personal.</h4>
                                            <p>În funcție de cazul care se impune, putem transmite sau oferi acces la anumite date cu caracter personal ale dumneavoastră, următoarelor categorii de destinatari: firmelor de curierat DPD și Fan Curier care asigură expediția produselor comandate.
                                            De asemenea, există și cazul în care pentru a ne apăra un interes legitim, putem de asemenea divulgă anumite date cu caracter personal unor autorități publice.
                                            În acest sens, ne asigurăm că accesul la datele dumneavoastră de către terții persoane juridice de drept privat este realizat, în baza unor contracte încheiate cu aceștia, așa cum specifică legea privind protecția datelor și confidențialitatea informațiilor.
</p>
                                            <h4>6.	Perioada de retenție a datelor cu caracter personal?</h4>
                                            <p>Datele cu caracter personal sunt stocate cât timp contul de pe gabrielhabet.com este activ. Bineînțeles, ne puteți solicită ștergerea anumitor date, ori închiderea contului, în funcție de preferințele dumneavoastră. În cazul comenzilor plasate pe www.gabrielhabet.com datele dumneavoastră personale, dintre cele care sunt cuprinse în documentele financiar-contabile sau în documente anexate acestora, vor fi păstrate 10 ani conform dispozițiilor art. 38 din Anexă 1 la Ordinul nr. 2634/2015 privind documentele financiar-contabile, emis de Ministerul Finanțelor Publice.
<br />Implicit, nu vor fi accesate în niciun alt scop decât scopul legal pentru care au fost arhivate. După termenul de 10 ani, aceste date vor fi distruse.</p>
                                            <h4>7.	Drepturile persoanei vizate de colectarea datelor personale.</h4>
                                            <p>Regulamentul general privind protecția datelor vă recunoaște o serie drepturi în ceea ce privește utilizarea datelor dumneavoastră cu caracter personal. <br />
                                                                    Puteți solicită accesul la datele dumneavoastră, corectarea greșelilor din fișierele noastre (dacă există) și/sau vă puteți opune la prelucrarea datelor dumneavoastră cu caracter personal. De asemenea, aveți dreptul de a vă plânge autorității de supraveghere competențe sau de a vă adresa justiției. După caz, puteți beneficia și de dreptul de a solicită ștergerea datelor dumneavoastră cu caracter personal, dreptul la restricționarea prelucrării datelor dumneavoastră și dreptul la portabilitatea datelor.
O listare a fiecărui drept îl puteți consulta mai jos:<br />
                                            </p><ul>
                                                <li>- accesul la datele personale</li>
                                                <li>- rectificare informațiilor sau a datele personale</li>
                                                <li>- ștergerea datelor personale sau a informațiilor. Realizarea acestui drept, aduce cu sine și eliminarea tuturor informațiilor despre user iar gabrielhabet.com nu este vinovat de pierderile suferite de user.</li>
                                                <li>- restricționarea datelor cu caracter personal</li>
                                                <li>- portabilitatea sau opoziția datelor cu caracter personal</li>
                                                <li>- depunerea deplânge la autoritatea de supraveghere</li>
                                            </ul>
                                            <h4>8.	Politică de utilizare a cookies-urilor.</h4>
                                            <p> Așa cum la rândul nostru, suntem clienți online, apreciem și respectăm importanța confidențialității și securității datelor de pe internet.
                                            gabrielhabet.com stochează și prelucrează datele cu caracter personal, în conformitate cu Legea privind protecția datelor cu caracter personal
</p>
                                            <p>Mai multe detalii despre cookies și modalitatea lor de folosire, puteți să citiți: <a href="/#/cookie_policy" title="Cookies">AICI</a></p>
                                            <h4>9.	Cum ne poți contacta?</h4>
                                            <p>Dacă ești în situația în care ai de adresat vreo întrbare cu privire la podusele noastre, ne poți contacta prin intermediul formularului de contact de pe site-ul nostru: https://www.gabrielhabet.com/contact, iar noi îți vom răspunde în cel mai scurt timp. </p>
                                            <p>De asemenea ai la dispoziție numărul de telefon: +40 753 696 163 , ori adesa de email: contact@gabrielhabet.com pentru întrebările extra. </p>
                                            <p>Pagină de facebook: https://www.facebook.com/butterflygabrielhabet îți stă, de asemenea, la dispoziție pentru a rezolva cu eficiență orice neclaritate ai mai avea.
Ține minte, de luni până vineri, între orele 09:00 – 17:00 ne poți adresa întrebările tale, iar noi cu plăcere îți vom răspunde.</p>
                                            <h3>Politică de confidențialitate GDPR cu privire la prelucrarea datelor.</h3><p></p>
                                            <p><a href="https://eur-lex.europa.eu/legal-content/RO/TXT/PDF/?uri=CELEX:32016R0679&amp;from=RO" target="_blank">Regulamentul (UE) 2016/679</a> al Parlamentului European și al Consiliului din 27 aprilie 2016 privind protecția persoanelor fizice în ceea ce privește prelucrarea datelor cu caracter personal și privind liberă circulație a acestora. gabrielhabet.com consideră asigurarea dreptului la protecția datelor cu caracter personal că un angajament fundamental în colaborarea noastră și respectă regulamentul UE.<br /> Vom încerca să depunem toate eforturile necesare pentru a preleva și prelucra datele personale ale utilizatorilor în deplină sigurata. Pentru că dorim o transparent totală în acest angajament, am pregătit această pagină <a href="https://www.gabrielhabet/#/privacy_policy">GDPR - Politică de confidențialitate</a>, pentru a prezența toate informațiile cât mai detaliat și transparent, după cum urmează:</p>
                                            <ol>
                                                <li><h5><b>Cine suntem și cum putem fi contactați:</b></h5></li>
                                                <ol>
                                                    <li>gabrielhabet.com este un magazin online www.gabrielhabet.com deținut de firma GABRIEL HABET SRL, în calitate de persoană juridică CUI: RO41533477, J22/2726/2019 cu domeniul de activitate în comerțul online. În angajamentul de colaborare, Gabriel Habet, reprezintă un operator atunci când prelucrează datele dumneavostră cu caracter personal.
</li>
                                                    <li>Pentru orice informații suplimentare despre GDPR sau calitatea de operator în prelucrarea datelor dumneavostră personale, va rugăm să ne contactați peadresa de e-mail: contact@gabrielhabet.com sau telefonic la numărul: +40 753 696 163 </li>
                                                </ol>
                                                <li><h5><b>Ce informații și date cu caracter personal păstrăm și prelucrăm despre dumneavoastră:</b></h5>
                                                    <p>Aceste date cu caracter personal, sunt de regulă colectate direct de la utilizator, astfel încât aveți controlul total sau parțial (acolo unde tehnică nu ne permite) asupra tipurilor de informații oferite. </p></li>
                                            </ol>
                                        </div>
                                    }

                                    {
                                        lang == 'en' &&
                                        <div>
                                            <p> Applying the requirements of the laws in force no. 677/2001 and 506/2014 on the protection of individuals with regard to the processing of personal data and the protection of privacy in the electronic communications sector. The owner, Gabriel Habet SRL having its registered office in Iași County, Țigănași Village, Țigănași Commune, Main Street, Nr. 126 with serial number in the Trade Register J22 / 2726/2019, unique fiscal registration code RO41533477 has the obligation to manage in safe conditions and only for precisely specified purposes your personal data that you provide when placing orders. </ p>
                                            <p> The customer is not obliged to provide the required data, but this is still necessary to complete the order and place new offers and discounts from our store. If you refuse to provide this data, it is impossible to process and deliver orders to the customer, which stops your order.
                                            The modification or deletion of personal data is guaranteed according to law no. 677/2001, and access to these changes is based on the user and password provided at the time of account creation.
The rights to oppose the processing of your data are also guaranteed by law, and the request for deletion of data is made by the Owner, through a registered request. <br />
                                        If any of your data is incorrect, please notify us immediately by any possible means of communication. </p>
                                            <h3> GDPR's privacy policy regarding data processing includes the following information: </h3>
                                            <h4> 1. What is general data? </h4>
                                            <p> Personal data is data that we usually collect directly from you so that you have control over the information you provide to us. </p>
                                            <p> For example, we receive information from you as follows: <br />
                                        When you create an account on our website www.gabrielhabet.com, send us: e-mail address. <br />
                                            In your personal section (My account) you can add additional information such as: name, surname, telephone number, delivery addresses. <br />
                                                When you place an order, you provide us with information such as: desired product, first and last name, delivery address, billing details, payment method, phone number, bank card details, etc. </p>
                                            <h4> 2. What types of personal data do we collect? </h4>
                                            <p> We collect the following personal data for certain purposes and services such as: </p>
                                            <ul>
                                                <li> <b> first and last name: </b> In order to deliver the ordered products, we need this data; </li>
                                                <li> <b> e-mail: </b> to communicate between the platform and the user, we use the e-mail address to confirm your order and to inform you about the status of orders; </li>
                                                <li> <b> phone number: </b> we need the phone number to confirm the order and to establish other details related to the placed order. </li>
                                                <li> <b> delivery address: </b> in order to deliver the order, we need to communicate the correct address in the order process </li>
                                                <li> <b> billing address: </b> In order to be able to make a tax invoice, we need to communicate the billing information correctly </li>
                                                <li> <b> order processing and settlement: </b> processing, validation, settlement or cancellation of orders and / or purchased goods and services. </li>
                                                <li> <b> money back: </b> the value of the products according to the existing legal provisions </li>
                                                <li> <b> refund of products: </b> return of products according to existing legal provisions </li>
                                            </ul>
                                            <h4> 3. What is the purpose and basis of the data processing and how do we use your personal information? </h4>
                                            <p> Data that "user / client" offer them to us voluntarily, the ones he sends by placing an order on the legal basis is to take steps at the request of the data subject before concluding a contract (Article 6 (1) (b) of Regulation (EU) 679 / 2016). <br />
                                                We use this data to be able to issue a tax invoice and make the correct and proper delivery of the products. </p>
                                            <p> In this regard, we always ensure that such processing is carried out in compliance with your rights and freedoms, and that the decisions taken on the basis thereof have no legal effect on you and do not affect you in a significant way. Marketing communications are sent with your prior consent. </p>
                                            <p> You can also change your mind and withdraw your consent at any time by: <br />
                                                    - Changing client account settings; <br />
                                                        - Unsubscribe from messages / emails you receive from us; <br />
                                                            - Contact gabrielhabet.com. <br />
                                            </p>
                                            <p> There are also certain situations in which we carry out our marketing activities on our legitimate interest to promote and develop our commercial activity, according to Law no. 506/2004, Art.12 (2). In such situations, where we use information about you for our legitimate interest, we intend to take all necessary measures to ensure that your fundamental rights and freedoms are not affected. </p>
                                            <h4> 4. What is the legal basis for which we collect this personal data? </h4>
                                            <p> The legal basis is to take steps at the request of the data subject by accessing, before concluding a contract (Article 6 (1) (b) of Regulation (EU) 679/2016). </p>
                                            <p> The data we collect automatically through the use of cookies or other similar technologies, the basis for processing is consent. By accessing the site, you validly give your consent to the processing of the information necessary for its use. </p>
                                            <h4> 5. Sharing personal data. </h4>
                                            <p> Depending on the case, we may transmit or provide access to certain personal data of yours to the following categories of recipients: DPD courier companies and Fan Curier who ensure the shipment of ordered products.
                                            There is also the case that in order to defend a legitimate interest, we may also disclose certain personal data to public authorities.
                                            In this regard, we ensure that access to your data by third parties under private law is made on the basis of contracts concluded with them, as specified in the law on data protection and confidentiality of information.
</p>
                                            <h4> 6. Retention period of personal data? </h4>
                                            <p> Personal data is stored while the account on gabrielhabet.com is active. Of course, you can ask us to delete certain data or close your account, depending on your preferences. In the case of orders placed on www.gabrielhabet.com, your personal data, among those that are included in the financial-accounting documents or in documents attached to them, will be kept for 10 years according to the provisions of art. 38 of Annex 1 to Order no. 2634/2015 on financial-accounting documents, issued by the Ministry of Public Finance.
<br /> By default, they will not be accessed for any purpose other than the legal purpose for which they were archived. After 10 years, this data will be destroyed. </p>
                                            <h4> 7. The rights of the data subject to the collection of personal data. </h4>
                                            <p> The General Data Protection Regulation gives you a number of rights with regard to the use of your personal data. <br />
                                                                    You can request access to your data, correct mistakes in our files (if any) and / or object to the processing of your personal data. You also have the right to complain to the supervisory authority or to go to court. DIn this case, you may also have the right to request the deletion of your personal data, the right to restrict the processing of your data and the right to data portability.
A list of each right can be found below: <br />
                                            </p> <ul>
                                                <li> - access to personal data </li>
                                                <li> - rectification of information or personal data </li>
                                                <li> - deletion of personal data or information. The realization of this right brings with it the elimination of all information about the user and gabrielhabet.com is not guilty of the losses suffered by the user. </li>
                                                <li> - restriction of personal data </li>
                                                <li> - portability or opposition of personal data </li>
                                                <li> - submission complains to the supervisory authority </li>
                                            </ul>
                                            <h4> 8. Cookies policy. </h4>
                                            <p> As well as being online customers, we appreciate and respect the importance of privacy and data security on the Internet.
                                            gabrielhabet.com stores and processes personal data in accordance with the Personal Data Protection Act
</p>
                                            <p> You can read more about cookies and how to use them: <a href="/#/cookie_policy" title="Cookies"> HERE </a> </p>
                                            <h4> 9. How can you contact us? </h4>
                                            <p> If you have any questions about our products, you can contact us via the contact form on our website: https://www.gabrielhabet.com/contact, and we will contact you. we will respond as soon as possible. </p>
                                            <p> You also have the phone number: +40 753 696 163, or often email: contact@gabrielhabet.com for extra questions. </p>
                                            <p> Facebook page: https://www.facebook.com/butterflygabrielhabet is also at your disposal to efficiently resolve any remaining questions.
Remember, from Monday to Friday, between 09:00 and 17:00 you can ask us your questions, and we will be happy to answer you. </p>
                                            <h3> GDPR privacy policy regarding data processing. </h3> <p> </p>
                                            <p> <a href="https://en-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32016R0679&amp;from=EN" target="_blank"> Regulation (EU ) 2016/679 </a> of the European Parliament and of the Council of 27 April 2016 on the protection of individuals with regard to the processing of personal data and on their free movement. gabrielhabet.com considers ensuring the right to the protection of personal data as a fundamental commitment in our collaboration and respects EU regulations. <br /> We will try our best to collect and process users' personal data in complete safety. Because we want total transparency in this commitment, we have prepared this page <a href="https://www.gabrielhabet/#/privacy_policy"> GDPR - Privacy Policy </a>, to present all the information in as much detail as possible. and transparent, as follows: </p>
                                            <ol>
                                                <li><h5> <b> Who we are and how we can be contacted: </b> </h5> </li>
                                                <ol>
                                                    <li> gabrielhabet.com is an online store www.gabrielhabet.com owned by the company GABRIEL HABET SRL, as a legal entity CUI: RO41533477, J22 / 2726/2019 with the field of activity in online commerce. In the collaboration commitment, Gabriel Habet, represents an operator when processing your personal data.
</li>
                                                    <li> For any additional information about GDPR or the quality of operator in the processing of your personal data, please contact us by e-mail: contact@gabrielhabet.com or by phone at: +40 753 696 163 </li>
                                                </ol>
                                                <li><h5> <b> What personal information and data we store and process about you: </b> </h5> <p> This personal data is usually collected directly from the user, so you have full or partial control (where technology does not allow us) over the types of information provided. </p> </li>
                                            </ol>
                                        </div>
                                    }

                                    {
                                        lang == 'it' &&
                                        <div>
                                            <p> Applicando i requisiti delle leggi in vigore n. 677/2001 e 506/2014 sulla tutela delle persone fisiche con riguardo al trattamento dei dati personali e la tutela della privacy nel settore delle comunicazioni elettroniche. Il proprietario, Gabriel Habet SRL con sede legale in Iași County, Villageigănași Village, Țigănași Commune, Main Street, Nr. 126 con numero di matricola nel Registro delle Imprese J22 / 2726/2019, codice fiscale univoco RO41533477 ha l'obbligo di amministrare in condizioni di sicurezza e solo per scopi precisamente specificati i tuoi dati personali che fornisci al momento dell'ordine. </ p>
                                            <p> Il cliente non è obbligato a fornire i dati richiesti, ma questo è comunque necessario per completare l'ordine e inserire nuove offerte e sconti dal nostro negozio. Se rifiuti di fornire questi dati, è impossibile elaborare e consegnare gli ordini al cliente, il che interrompe il tuo ordine.
                                            La modifica o la cancellazione dei dati personali è garantita ai sensi della legge n. 677/2001 e l'accesso a queste modifiche si basa sull'utente e sulla password forniti al momento della creazione dell'account.
I diritti di opposizione al trattamento dei tuoi dati sono garantiti anche dalla legge, e la richiesta di cancellazione dei dati è avanzata dal Titolare, tramite richiesta registrata. <br />
                                        Se qualcuno dei tuoi dati non è corretto, ti preghiamo di comunicarcelo immediatamente con ogni possibile mezzo di comunicazione. </p>
                                            <h3> La politica sulla privacy del GDPR relativa al trattamento dei dati include le seguenti informazioni: </h3>
                                            <h4> 1. Cosa sono i dati generali? </h4>
                                            <p> I dati personali sono dati che di solito raccogliamo direttamente da te in modo che tu abbia il controllo sulle informazioni che ci fornisci. </p>
                                            <p> Ad esempio, riceviamo informazioni da te come segue: <br />
                                        Quando crei un account sul nostro sito web www.gabrielhabet.com, inviaci: indirizzo e-mail. <br />
                                            Nella tua sezione personale (Il mio account) puoi aggiungere ulteriori informazioni quali: nome, cognome, numero di telefono, indirizzi di consegna. <br />
                                                Quando effettui un ordine, ci fornisci informazioni quali: prodotto desiderato, nome e cognome, indirizzo di consegna, dettagli di fatturazione, metodo di pagamento, numero di telefono, dettagli della carta bancaria, ecc. </p>
                                            <h4> 2. Quali tipi di dati personali raccogliamo? </h4>
                                            <p> Raccogliamo i seguenti dati personali per determinati scopi e servizi come: </p>
                                            <ul>
                                                <li> <b> nome e cognome: </b> per poter consegnare i prodotti ordinati, abbiamo bisogno di questi dati; </li>
                                                <li> <b> e-mail: </b> per comunicare tra la piattaforma e l'utente, utilizziamo l'indirizzo e-mail per confermare il tuo ordine e per informarti sullo stato degli ordini; </li>
                                                <li> <b> numero di telefono: </b> abbiamo bisogno del numero di telefono per confermare l'ordine e per stabilire altri dettagli relativi all'ordine effettuato. </li>
                                                <li> <b> indirizzo di consegna: </b> al fine di consegnare l'ordine, dobbiamo comunicare l'indirizzo corretto nel processo di ordinazione </li>
                                                <li> <b> indirizzo di fatturazione: </b> per presentare correttamente una fattura fiscale, abbiamo bisogno dei dati di fatturazione corretti </li>
                                                <li> <b> elaborazione e liquidazione degli ordini: </b> elaborazione, convalida, liquidazione o annullamento di ordini e / o beni e servizi acquistati. </li>
                                                <li> <b> rimborso: </b> il valore dei prodotti secondo le disposizioni legali esistenti </li>
                                                <li> <b> rimborso dei prodotti: </b> restituzione dei prodotti in base alle disposizioni legali esistenti </li>
                                            </ul>
                                            <h4> 3. Qual è lo scopo e la base del trattamento dei dati e come utilizziamo le tue informazioni personali? </h4>
                                            <p> I dati che l '"utente / cliente" ne offrirli volontariamente, quelli che invia effettuando un ordine sulla base giuridica è di prendere provvedimenti su richiesta dell'interessato prima di concludere un contratto (articolo 6 (1) (b) del Regolamento (UE) 679/2016) . <br />
                                                Utilizziamo questi dati per poter emettere una fattura fiscale ed effettuare la corretta e corretta consegna dei prodotti. </p>
                                            <p> A questo proposito, ci assicuriamo sempre che tale trattamento sia effettuato nel rispetto dei tuoi diritti e libertà e che le decisioni prese sulla base di ciò non abbiano alcun effetto legale su di te e non ti influenzino in modo significativo. Le comunicazioni di marketing vengono inviate previo tuo consenso. </p>
                                            <p> Puoi anche cambiare idea e revocare il tuo consenso in qualsiasi momento: <br />
                                                    - Modifica delle impostazioni dell'account cliente; <br />
                                                        - Annulla l'iscrizione ai messaggi / e-mail che ricevi da noi; <br />
                                                            - Contatta gabrielhabet.com. <br />
                                            </p>
                                            <p> Ci sono anche alcune situazioni in cui svolgiamo le nostre attività di marketing sul nostro legittimo interesse a promuovere e sviluppare la nostra attività commerciale, ai sensi della Legge n. 506/2004, Art.12 (2). In tali situazioni, in cui utilizziamo le informazioni su di te per il nostro legittimo interesse, intendiamo prendere tutte le misure necessarie per garantire che i tuoi diritti e le tue libertà fondamentali non siano pregiudicati. </p>
                                            <h4> 4. Qual è la base giuridica per la quale raccogliamo questi dati personali? </h4>
                                            <p> La base giuridica è l'adozione di provvedimenti su richiesta dell'interessato accedendo, prima di concludere un contratto (articolo 6 (1) (b) del Regolamento (UE) 679/2016). </p>
                                            <p> I dati che raccogliamo automaticamente attraverso l'uso di cookie o altre tecnologie simili, la base per il trattamento è il consenso. Accedendo al sito presti validamente il tuo consenso al trattamento delle informazioni necessarie al suo utilizzo. </p>
                                            <h4> 5. Condivisione dei dati personali. </h4>
                                            <p> A seconda dei casi, potremmo trasmettere o fornire l'accesso a determinati tuoi dati personali alle seguenti categorie di destinatari: corrieri DPD e Fan Curier che garantiscono la spedizione dei prodotti ordinati.
                                            C'è anche il caso in cui, al fine di difendere un interesse legittimo, potremmo anche divulgare alcuni dati personali ad autorità pubbliche.
                                            A tal proposito, garantiamo che l'accesso ai tuoi dati da parte di terzi di diritto privato avvenga sulla base di contratti stipulati con loro, come specificato dalla legge sulla protezione dei dati e sulla riservatezza delle informazioni.
</p>
                                            <h4> 6. Periodo di conservazione dei dati personali? </h4>
                                            <p> I dati personali vengono conservati mentre l'account su gabrielhabet.com è attivo. Ovviamente puoi chiederci di cancellare determinati dati o chiudere il tuo account, a seconda delle tue preferenze. Nel caso di ordini effettuati su www.gabrielhabet.com, i Suoi dati personali, tra quelli che rientrano nei documenti finanziario-contabili o nei documenti ad essi allegati, saranno conservati per 10 anni secondo quanto previsto dall'art. 38 dell'Allegato 1 al Decreto n. 2634/2015 sui documenti finanziario-contabili, rilasciato dal Ministero delle Finanze Pubbliche.
<br /> Per impostazione predefinita, non sarà possibile accedervi per scopi diversi dallo scopo legale per il quale sono stati archiviati. Dopo 10 anni, questi dati verranno distrutti. </p>
                                            <h4> 7. I diritti dell'interessato alla raccolta dei dati personali. </h4>
                                            <p> Il regolamento generale sulla protezione dei dati ti conferisce una serie di diritti in relazione all'uso dei tuoi dati personali. <br />
                                                                    Puoi richiedere l'accesso ai tuoi dati, correggere gli errori nei nostri file (se presenti) e / o opporti al trattamento dei tuoi dati personali. Hai anche il diritto di presentare reclamo all'autorità di controllo o di adire il tribunale. Partire In questo caso, potresti anche avere il diritto di richiedere la cancellazione dei tuoi dati personali, il diritto di limitare il trattamento dei tuoi dati e il diritto alla portabilità dei dati.
Di seguito è riportato un elenco di ciascun diritto: <br />
                                            </p> <ul>
                                                <li> - accesso ai dati personali </li>
                                                <li> - rettifica delle informazioni o dei dati personali </li>
                                                <li> - cancellazione di dati o informazioni personali. La realizzazione di questo diritto porta con sé anche l'eliminazione di tutte le informazioni sull'utente e gabrielhabet.com non è colpevole delle perdite subite dall'utente. </li>
                                                <li> - limitazione dei dati personali </li>
                                                <li> - portabilità o opposizione dei dati personali </li>
                                                <li> - presentazione reclami all'autorità di controllo </li>
                                            </ul>
                                            <h4> 8. Politica sui cookie. </h4>
                                            <p> Oltre ad essere clienti online, apprezziamo e rispettiamo l'importanza della privacy e della sicurezza dei dati su Internet.
                                            gabrielhabet.com archivia ed elabora i dati personali in conformità con la legge sulla protezione dei dati personali
</p>
                                            <p> Puoi leggere ulteriori informazioni sui cookie e su come utilizzarli: <a href="/#/cookie_policy" title="Cookies"> QUI </a> </p>
                                            <h4> 9. Come puoi contattarci? </h4>
                                            <p> Se hai domande sui nostri prodotti, puoi contattarci tramite il modulo di contatto sul nostro sito web: https://www.gabrielhabet.com/contact e ti contatteremo. Ti risponderemo il prima possibile. </p>
                                            <p> Hai anche il numero di telefono: +40 753 696 163, o spesso scrivi a: contact@gabrielhabet.com per ulteriori domande. </p>
                                            <p> Pagina Facebook: https://www.facebook.com/butterflygabrielhabet è anche a tua disposizione per risolvere in modo efficiente qualsiasi domanda tu possa avere.
Ricorda, dal lunedì al venerdì, dalle 09:00 alle 17:00, puoi farci le tue domande e saremo felici di risponderti. </p>
                                            <h3> Informativa sulla privacy del GDPR relativa al trattamento dei dati. </h3> <p> </p>
                                            <p> <a href="https://en-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32016R0679&amp;from=EN" target="_blank"> Regolamento (UE ) 2016/679 </a> del Parlamento europeo e del Consiglio, del 27 aprile 2016, sulla tutela delle persone fisiche con riguardo al trattamento dei dati personali e sulla loro libera circolazione. gabrielhabet.com considera garantire il diritto alla protezione dei dati personali un impegno fondamentale nella nostra collaborazione e rispetta le normative UE. <br /> Cercheremo di fare ogni sforzo per raccogliere e trattare i dati personali degli utenti in completa sicurezza. Poiché vogliamo la totale trasparenza in questo impegno, abbiamo preparato questa pagina <a href="https://www.gabrielhabet/#/privacy_policy"> GDPR - Privacy Policy </a>, per presentare tutte le informazioni nel modo più dettagliato possibile. e trasparente, come segue: </p>
                                            <ol>
                                                <li> <h5> <b> Chi siamo e come possiamo essere contattati: </b> </h5> </li>
                                                <ol>
                                                    <li> gabrielhabet.com è un negozio online www.gabrielhabet.com di proprietà della società GABRIEL HABET SRL, in qualità di persona giuridica CUI: RO41533477, J22 / 2726/2019 con il campo di attività nel commercio online. Nell'impegno di collaborazione, Gabriel Habet, rappresenta un operatore nel trattamento dei dati personali.
</li>
                                                    <li> Per qualsiasi informazione aggiuntiva sul GDPR o sulla qualità dell'operatore nel trattamento dei tuoi dati personali, ti preghiamo di contattarci tramite e-mail: contact@gabrielhabet.com o per telefono al: +40 753 696 163 </li>
                                                </ol>
                                                <li> <h5> <b> Quali informazioni e dati personali archiviamo ed elaboriamo su di te: </b> </h5> <p> Questi dati personali vengono solitamente raccolti direttamente dall'utente, in modo che tu abbia il controllo totale o parziale (laddove la tecnologia non ci consente) sui tipi di informazioni fornite. </p> </li>
                                            </ol>
                                        </div>
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </main>


            </div>
        );
    }
}