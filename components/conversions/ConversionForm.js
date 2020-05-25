import React from 'react'
import {
    Input,
    Label,
    Form,
    Header,
    Dropdown,
    Tab,
    Segment
} from 'semantic-ui-react'
const currenciesJson = require('../../supported-currencies.json')
const fxJson = require('../../fx.json')


class ConversionForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            currencies: [],
            fxRate: {},
            toCurrencyID: 'NGN',
            fromcurrencyID: 'USD',
            fromToConversionRate: 0,
            toFromConversionRate: 0,
            amount: 0
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.getCurrencies = this.getCurrencies.bind(this)
        this.renderCurrencyDataList = this.renderCurrencyDataList.bind(this)
        this.getCurrencies()
    }
    getCurrencies()  {
        let raw = currenciesJson.results
        let allowed = Object.keys(fxJson.results)
        allowed = allowed.map(fromToCurrency => fromToCurrency.split('_')[0])
        allowed.push('NGN')
        currenciesJson.results = Object.keys(raw)
                            .filter(key => allowed.includes(key))
                            .reduce((obj, key) => { 
                                obj[key] = raw[key]
                                return obj; 
                                }, {}
                            )
        this.setState({currencies: Object.entries(currenciesJson.results)})
    }

    renderCurrencyDataList () {
        return this.state.currencies.map(currency => { 
            return {
                key: currency[0],
                text: currency[1].currencyName,
                value: currency[0]
            }
        })  
    }

    handleChange = (event, data) => {
        if (data.input.id === 'amount') {
            this.setState({amount: data.value})
        }
        else if (data.input.id === "form-select-control-from") {
            this.convertCurrency(data.value, this.state.toCurrencyID)
        }
        else if (data.input.id === "form-select-control-to") {
            this.convertCurrency(this.state.fromcurrencyID, data.value)
        }
    }

    async convertCurrency (fromCurrency, toCurrency) {
        const fxRate = this.state.fxRate.results
        let fromToQuery = `${fromCurrency}_${toCurrency}`
        const checkfx = defaultfx => fxRate[defaultfx]
        const derivedFx = (fr, to) => {
            const filteredfxPair = Object.keys(fxRate).filter(key => [fr, to].includes(key.split('_')[0]))
            let filteredFx = filteredfxPair.reduce((obj, key) => { 
                obj[key] = fxRate[key]
                return obj}, {}
            )
            const fr_to = {val: filteredFx[`${fr}_NGN`].val / filteredFx[`${to}_NGN`].val, to: toCurrency, fr: fromCurrency}
            const to_fr = {val: filteredFx[`${to}_NGN`].val / filteredFx[`${fr}_NGN`].val, to: toCurrency, fr: fromCurrency}
            return [fr_to, to_fr]
        }
        this.setState({
            fromToConversionRate: checkfx(fromToQuery)? 
                                    Number.parseFloat(fxRate[fromToQuery].val).toFixed(4) : 
                                    Number.parseFloat(derivedFx(fromCurrency, toCurrency)[0].val).toFixed(4),
            toFromConversionRate: checkfx(fromToQuery)? 
                                    Number.parseFloat(1/fxRate[fromToQuery].val).toFixed(4) : 
                                    Number.parseFloat(derivedFx(fromCurrency, toCurrency)[1].val).toFixed(4),
            toCurrencyID: checkfx(fromToQuery)? 
                                    fxRate[fromToQuery].to : 
                                    derivedFx(fromCurrency, toCurrency)[0].to,
            fromcurrencyID: checkfx(fromToQuery)? 
                                    fxRate[fromToQuery].fr : 
                                    derivedFx(fromCurrency, toCurrency)[0].fr,
        })
    }

    async componentDidMount () {
        this.setState({fxRate: fxJson})
        await this.getCurrencies()
        await this.convertCurrency(this.state.fromcurrencyID, this.state.toCurrencyID)
    }

    render () {
        return (
            <Tab panes={[{menuItem: 'Live Market Rates', render: () =>(<Segment style={{borderRadius:0}} inverted color={'black'}><Form size='big'>
              <Header color={'orange'} content="Choose The Currencies You Wish To Convert Below" style={{textAlign:'center', fontWeight: 'bolder', marginBottom: '25px'}} />
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Dropdown}
                        options={this.renderCurrencyDataList()}
                        label={<Label htmlFor='form-select-control-from' content={'From'} color={'orange'} pointing={'below'} />}
                        placeholder={this.state.fromCountryID}
                        search
                        selection 
                        fluid
                        onChange={this.handleChange}
                        defaultValue={this.state.fromcurrencyID}
                        input={{ id: 'form-select-control-from' }}
                    />
                    <Form.Field
                        control={Dropdown}
                        options={this.renderCurrencyDataList()}
                        label={<Label htmlFor='form-select-control-to' content={'To'} color={'orange'} pointing={'below'} />}
                        placeholder={this.state.toCountryID}
                        search
                        onChange={this.handleChange}
                        defaultValue={this.state.toCurrencyID}
                        selection 
                        fluid
                        input={{ id: 'form-select-control-to' }}
                    />
                    <Form.Field
                        label={<Label htmlFor='form-select-control-amount' content={'Amount'} color={'orange'} pointing={'below'} />}
                        control={Input}
                        input={{id: 'amount'}}
                        placeholder={this.state.amount}
                        value={this.state.amount}
                        fluid
                        width='eight'
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Header as={Segment} color='grey' style={{fontSize: 'small', fontWeight: 'lighter'}} content='All figures are live mid-market rates, which are not available to consumers and are for informational purposes only.' />
                <Header 
                    style={{fontWeight: 'bold'}} 
                    color={'orange'}
                    as='h4'
                    content={`${this.state.amount} ${this.state.fromcurrencyID} = `} 
                />
                <h1 style={{color: '#f2711c', fontWeight: 'bolder', fontSize:'3em'}}>
                    {Number.parseFloat(this.state.fromToConversionRate*this.state.amount).toFixed(4)} <small style={{fontSize:'large'}}>{this.state.toCurrencyID}</small>
                </h1>
                <Header 
                    style={{color: '#f2711c', fontWeight: 'bolder'}} 
                    as='h3'
                    content={`${this.state.amount? 1:0} ${this.state.toCurrencyID} = ${this.state.amount?this.state.toFromConversionRate:0} ${this.state.fromcurrencyID}`} 
                />
                <Header 
                    style={{color: '#f2711c', fontWeight: 'bold'}} 
                    as='h3'
                    content={`${this.state.amount? 1:0} ${this.state.fromcurrencyID} = ${this.state.amount? this.state.fromToConversionRate:0} ${this.state.toCurrencyID}`} 
                />
            </Form></Segment>)}]} />

        )
    }
}

export default ConversionForm
