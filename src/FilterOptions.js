import React, { Component } from 'react';

import './FilterOptions.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

import Autosuggest from 'react-autosuggest';

function getCheckboxLabel(value, text)
{
    return (<label key={value}><Checkbox  value={value}/><span> {text}</span></label>);
}

function getCheckboxLabels(selections)
{
    return selections.map((selection) => getCheckboxLabel(selection.value, selection.text));
}

export class FilterOptions extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
          options: this.props.defaultSelections ? this.props.defaultSelections : [''],
          value: '',
          suggestions: []
      };
  }

      
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
   
    return inputLength === 0 ? [] : this.props.selections.filter(selection =>
      selection.text.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.text;

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion.text}
    </div>
  );
     
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionSelected = ( event, {suggestion, suggestionValue}) => {
    console.log(event);
    console.log(suggestion);
    console.log(suggestionValue);
    if (this.state.options.indexOf(suggestion.value) === -1) {
        this.state.options.push(suggestion.value);
    }
    this.setState({
        value: ""
    });
    this.props.selectionsChanged(this.state.options);
  };
 
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    console.log("clear requested");
    this.setState({
      suggestions: []
    });
  };

  onAutosuggestChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };
      
  optionsChanged = (newOptions) => {
    this.setState({
      options: newOptions
    });
    this.props.selectionsChanged(newOptions);
  }
  
  render() {   
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a material',
            value,
            onChange: this.onAutosuggestChange
        };

        return (
          <div className="FilterOptions">
            <div className="optionsTitle" ><h4>{this.props.title}</h4></div>
            <div className="viewBy">
            <span>View By</span>
            <Dropdown className="dropdown" options={this.props.dropdown.options} onChange={this._onSelect} value={this.props.dropdown.defaultOption} placeholder="Select an option" />
            </div>
            <Autosuggest
                className="autoSuggest"
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                highlightFirstSuggestion={true}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
            
            <CheckboxGroup
                  className="checkboxGroup"
                  checkboxDepth={2} // This is needed to optimize the checkbox group
                  name="optionGroup"
                  value={this.state.options}
                  onChange={this.optionsChanged}>
          
                  {getCheckboxLabels(this.props.selections)}
              </CheckboxGroup>
          </div>
        );
  
    }
}