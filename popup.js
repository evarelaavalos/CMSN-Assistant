document.addEventListener('DOMContentLoaded', async () => {
    
    await displayBills();

});

const displayBills = async () => {
    const savedBills = await BillService.getBills();

    //Use Clojures to remember showMoreButton
    //even when i remove it from the DOM

    //Hide the "show more" button
    const showMoreButton = document.getElementById('show-more');
    showMoreButton.setAttribute('hidden', '');

    //Append the empty element to the items list
    const items = document.getElementById('items-list');
    const emptyElement = document.getElementById('empty-list');
    items.innerHTML = '';
    items.append(emptyElement)

    if (savedBills.length) {
        //Show the "show more" button
        showMoreButton.removeAttribute('hidden');

        //Remove the empty message from the items list
        items.removeChild(emptyElement);

        //Display max 5 bills
        for (let i = 0; (i < savedBills.length) && (i < MAX_BILLS); i++) {
            //Create the elements for the bills
            //      destructure savedBills[i] as needed
            const { fullName, affiliateNumber, tokenNumber } = savedBills[i];
            
            const patientFullname = document.createElement('h2');
            patientFullname.classList.add('patient-fullname');
            patientFullname.appendChild(document.createTextNode(fullName))
            
            const patientAffiliateNumber = document.createElement('p');
            patientAffiliateNumber.classList.add('patient-affiliate-number');
            patientAffiliateNumber.appendChild(document.createTextNode(
            `Nro. de Afiliado: ${affiliateNumber}`))
            
            const billPatient = document.createElement('div');
            billPatient.classList.add('patient');
            billPatient.appendChild(patientFullname);
            billPatient.appendChild(patientAffiliateNumber);
            
            const tokenNumberElement = document.createElement('span');
            tokenNumberElement.classList.add('token-number');
            tokenNumberElement.appendChild(document.createTextNode(tokenNumber));
            
            const billToken = document.createElement('h4');
            billToken.classList.add('token');
            billToken.appendChild(tokenNumberElement);
            tokenNumberElement.appendChild(document.createTextNode('Nro. de Comprobante:'));
            
            const bill = document.createElement('div');
            bill.classList.add('item');
            bill.appendChild(billPatient);
            bill.appendChild(billToken);
            
            //Append them into the list
            items.appendChild(bill);
        }
    }
}
