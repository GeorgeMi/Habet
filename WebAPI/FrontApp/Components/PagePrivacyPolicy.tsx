import * as React from 'react';
import { Header } from './Header';
import * as Translate from 'react-translate-component';
import en from './languages/en';
import it from './languages/it';
import ro from './languages/ro';

export class PrivacyPolicy extends React.Component {
    constructor(props) {
        super(props);

        this.reloadPage = this.reloadPage.bind(this);
    }

    public reloadPage() {
        //do nothing
    }

    render() {
        return (
            <div>
                <main id="main">
                    <div>

                        <Header />
                        <section className="ftco-section contact-section bg-light">
                            <div className="container">
                                <div className="bg-white p-5" style={{ textAlign: 'justify' }}>
                                    <div className="row justify-content-center mb-3 pb-3">
                                        <div className="col-md-12 heading-section text-center">
                                            <h2 className="mb-4"><Translate content='privacyPolicy.Title' /></h2>
                                        </div>
                                    </div>
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
                            </div>
                        </section>
                    </div>
                </main>


            </div>
        );
    }
}