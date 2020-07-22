function printReceipt(barcodes) {
//     console.log(`
// ***<store earning no money>Receipt ***
// Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
// Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
// Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
// ----------------------
// Total: 23 (yuan)
// **********************`);

    let quantityObj = calculateItemQuantity(barcodes);
    let barcodeList = decodeBarcodes(quantityObj, itemInfo());
    printReceiptByBarcode(barcodeList);
}

//TODO
function totalPrice(itemList) {
    let total = 0;
    for (let i in itemList) {
        total += itemList[i].subTotal;
    }
    
    return total;
}

//TODO
function printReceiptByBarcode(barcodeList) {
    if (barcodeList.length > 0) {
        let str = '\n';
        let total = totalPrice(barcodeList);
        str += '***<store earning no money>Receipt ***\n';
        for (let i in barcodeList) {
            let name = `Name: ${ barcodeList[i].name }, `;
            let quantity = `Quantity: ${barcodeList[i].quantity}, `;
            let price = `Unit price: ${ barcodeList[i].price } (yuan), `;
            let subTotal = `Subtotal: ${ barcodeList[i].subTotal} (yuan)`;
            str += name + quantity + price + subTotal + '\n';
        }

        str += '----------------------\n';
        str += `Total: ${ total } (yuan)\n`;
        str += '**********************';
        console.log(str);
    }
}



//计算每个item的数量
function calculateItemQuantity(barcodes) {
    let countedQuantity = barcodes.reduce((preItem, curItem) => {
        if (curItem in preItem) { //判断当前元素是否跟已经对比的元素相等
            preItem[curItem]++;
        } else {
            preItem[curItem] = 1;
        }
        return preItem;
    }, {});

    return countedQuantity;
}

//筛选出跟订单信息相同的item 
//TODO
function decodeBarcodes(items, itemInfo) {

    let itemList = [];

    if (JSON.stringify(items) === "{}") {
        return itemList;
    }

    if (itemInfo.length === 0) {
        return itemList;
    }

    //console.log(items, itemInfo);

    Object.keys(items).forEach( itemKey => {
        let item = itemInfo.find(item => { //find the first value suitable for condition
            return itemKey === item.barcode;
        })

        delete item.barcode;
        item.quantity = items[itemKey];
        item.subTotal = item.quantity * item.price;
        itemList.push(item);
    }
    )

    return itemList;
}

function itemInfo() {
    let arr = [
        {
            barcode: 'ITEM000000',
            name: 'Coca-Cola',
            price: 3
        },
        {
            barcode: 'ITEM000001',
            name: 'Sprite',
            price: 3
        },
        {
            barcode: 'ITEM000002',
            name: 'Apple',
            price: 5
        },
        {
            barcode: 'ITEM000003',
            name: 'Litchi',
            price: 15
        },
        {
            barcode: 'ITEM000004',
            name: 'Battery',
            price: 2
        },
        {
            barcode: 'ITEM000005',
            name: 'Instant Noodles',
            price: 4
        }
    ];
    return arr;
}


module.exports = {
    printReceipt
};