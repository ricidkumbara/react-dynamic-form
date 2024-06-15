import { useEffect, useState } from 'react'
import './../App.css';

function generateId() {
  return (Math.random() + 1).toString(36).substring(7);
}

function ItemForm(props) {
  return (
    <tr>
      <td>
        <input 
          type="text" 
          name='name' 
          placeholder='name'
          value={props.item.name} 
          onChange={(e) => props.onHandleItemsChange(e, props.index)} 
        />
      </td>
      <td>
        <input 
          type="number" 
          name='qty' 
          placeholder='Quantity' 
          value={props.item.qty}
          onChange={(e) => props.onHandleItemsChange(e, props.index)} 
        />
      </td>
      <td>
        <input 
          type="text" 
          name='note' 
          placeholder='Note' 
          value={props.item.note}
          onChange={(e) => props.onHandleItemsChange(e, props.index)} 
        />
      </td>
      <td>
        <select 
          name="packing" 
          defaultValue={props.item.packing}
          onChange={(e) => props.onHandleItemsChange(e, props.index)}
        >
          <option value="">Pilih</option>
          <option value="kayu">Kayu</option>
          <option value="plastik">Plastik</option>
        </select>
      </td>
      <td>
        <input 
          type="checkbox" 
          name='asuransi_astra'
          defaultChecked={props.item.asuransi_astra}
          onChange={(e) => props.onHandleItemsChange(e, props.index)}
        /> Astra
        <input 
          type="checkbox" 
          name='asuransi_other' 
          defaultChecked={props.item.asuransi_other}
          onChange={(e) => props.onHandleItemsChange(e, props.index)}
        /> Other
      </td>
      <td>
        <select 
          name="delivery_id" 
          defaultValue={props.item.delivery_id}
          onChange={(e) => props.onHandleItemsChange(e, props.index)}
        >
          <option value="">Pilih</option>
          {getDeliveryType().map((v) => (
            <option value={v.id} key={v.id}>{v.name}</option>
          ))}
        </select>
      </td>
      <td>
        <select 
          name="provider_id" 
          defaultValue={props.item.provider_id}
          onChange={(e) => props.onHandleItemsChange(e, props.index)}
        >
          <option value="">Pilih</option>
          {props.item._providers.map((v) => (
            <option value={v.id} key={v.id}>{v.name}</option>
          ))}
        </select>
      </td>
    </tr>
  )
}

function DynamicForm() {
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    setItems([...items, {
      id: generateId(),
      name: '',
      qty: '',
      note: '',
      packing: '',
      asuransi_astra: false,
      asuransi_other: false,
      delivery_id: '',
      provider_id: '',
      _providers: [],
    }]);
  }

  const handleSubmitItem = () => {
    console.log(items);
  }

  const handleItemsChange = (e, i) => {
    const newItems = [...items];
    
    if (e.target.type == 'text' || e.target.type == 'number' || e.target.type == 'select-one') {
      newItems[i][e.target.name] = e.target.value;

      // For Delivery ID
      if (e.target.name == 'delivery_id') {
        newItems[i]['provider_id'] = '';

        if (e.target.value != "") {
          newItems[i]['_providers'] = getProvider().filter((provider) => provider.delivery_id == e.target.value)
        } else {
          newItems[i]['_providers'] = [];
        }
      }
    } else if (e.target.type == 'checkbox') {
      newItems[i][e.target.name] = e.target.checked;
    }

    setItems(newItems);
  }

  useEffect(() => {
    setTimeout(() => {
      const sampleItems = getSampleItem();
      const providers = getProvider();

      sampleItems.forEach((v, i) => {
        sampleItems[i]._providers = providers.filter(a => a.delivery_id == v.delivery_id);
      })

      setItems(sampleItems);
    }, 1000);
  }, [])

  return (
    <>
      <div>React Dynamic Form</div>
      <div>
        <button type='button' onClick={handleAddItem}> Add Item</button>
        <button type='button' onClick={handleSubmitItem}> Submit</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Qty</td>
            <td>Note</td>
            <td>Packing</td>
            <td>Asuransi</td>
            <td>Pengiriman</td>
            <td>Provider</td>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <ItemForm 
              index={index}
              key={item.id}
              item={item}
              onHandleItemsChange={handleItemsChange}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

function getSampleItem() {
  return [
    {
      id: "qziy3",
      name: "HP",
      qty: "1",
      note: "Kirim cepet",
      packing: "kayu",
      asuransi_astra: true,
      asuransi_other: true,
      delivery_id: '1',
      provider_id: '1',
      _providers: [],
    },
    {
      id: "zxf6x",
      name: "Laptop",
      qty: "2",
      note: "Express",
      packing: "plastik",
      asuransi_astra: false,
      asuransi_other: false,
      delivery_id: '1',
      provider_id: '2',
      _providers: [],
    },
    {
      id: "tfqud",
      name: "Test",
      qty: "2",
      note: "Test",
      packing: "plastik",
      asuransi_astra: false,
      asuransi_other: false,
      delivery_id: '2',
      provider_id: '4',
      _providers: [],
    }
  ];
}

function getDeliveryType() {
  return [
    {
      id: 1,
      name: 'Normal'
    },
    {
      id: 2,
      name: 'Kargo'
    }
  ]
}

function getProvider() {
  return [
    {
      id: 1,
      name: 'JNE',
      delivery_id: 1
    },
    {
      id: 2,
      name: 'SiCepat',
      delivery_id: 1
    },
    {
      id: 3,
      name: 'Kargo A',
      delivery_id: 2
    },
    {
      id: 4,
      name: 'Kargo B',
      delivery_id: 2
    }
  ]
}

export default DynamicForm
