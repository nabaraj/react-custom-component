import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
`
const ListUnstyled = css`
padding-left: 0;
list-style: none;
`
const InputStyle = css`
display: block;
box-sizing: border-box;
width: 100%;
height: calc(1.5em + .75rem + 2px);
padding: .375rem .75rem;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
color: #495057;
background-color: #fff;
background-clip: padding-box;
border: 1px solid #ced4da;
border-radius: .25rem;
`;
const Div = styled.div``;
const CheckBox = styled.input`
${props =>
        props.hiddenCheckBox &&
        css`
      visibility: hidden;
      position:absolute;
      font-size:0;
    `};
`;
const CustomDropdownContainer = styled(Div)`position:relative; font-family:Arial, Helvetica, sans-serif;`
const DropDownArrow = styled.span`
position: absolute;
right: 8px;
top: 50%;
transform: translateY(-50%);
${props =>
    props.toggleSelect &&
    css`
    >img{
        transform:rotate(180deg);
    }
`};
`
const DisplayTagContainer = styled(Div)`${InputStyle} position:relative; padding-right:50px; min-height: calc(1.5em + .75rem + 2px); height:auto`;
const ListContainer = styled(Div)`
    position:absolute; 
    top:100%; width:100%;
    padding:5px;
    border:1px solid #ced4da;
    `
const Input = styled.input`${InputStyle} padding-right:20px;`
const ListUl = styled.ul`${ListUnstyled} margin-top:3px;margin-bottom:3px;`
const ListUlWrapper = styled(Div)`
overflow:auto;
max-height:200px;
`
const ListLi = styled.li`position:relative;`
const Badge = styled.span`
padding: .25em .4em;
font-size: 75%;
font-weight: 700;
line-height: 1;
text-align: center;
white-space: nowrap;
vertical-align: baseline;
border-radius: .25rem;
background-color:green;
color:white;
margin:0 2px 2px;
display:flex;
`
const BadgeWrapper = styled(Div)`
    display:flex;
    flex-wrap:wrap;
`
const SearchContainer = styled(Div)`
    position:relative;
`
const CloseBtn = styled.span`
    
    cursor:pointer;
    font-size:12px;
    font-weight:600px;
    margin-left:8px;
    ${props =>
        props.theme==="searchInput" &&
        css`
        position:absolute;
        right:8px;
        top:50%;
        transform:translateY(-50%);
    `}
`


export default function CustomDropdown(props) {
    let { 
        options = [], 
        multiSelect=false, 
        hiddenCheckBox=false, 
        getValue,
        searchPlaceholder="Search Option" 
    } = props;
    const [selectedOption, addOption] = useState([]);
    const [toggleSelect, toggleSelectMethod] = useState(false);
    const [filteredOption, setOption] = useState(options);
    const [searchText, setSearch] = useState("")

    let selectOption = (e) => {
        let val = e.target.value;
        let selectedOptionstate = selectedOption;
        let indexOf = selectedOption.indexOf(val);

        if (multiSelect) {
            if (indexOf === -1) {
                addOption([...selectedOptionstate, val]);
            }
            else {
                addOption([...selectedOptionstate.slice(0, indexOf), ...selectedOptionstate.slice(indexOf + 1)])
            }
        } else {
            selectedOptionstate = [];
            if (indexOf === -1) {
                selectedOptionstate.push(val);
            }
            addOption(selectedOptionstate);
        }
        

    }
    let removeBadge = (badgeId) => {
        let selectedOptionstate = selectedOption;
        let indexOf = selectedOption.indexOf(badgeId);
        addOption([...selectedOptionstate.slice(0, indexOf), ...selectedOptionstate.slice(indexOf + 1)])
    }
    let searchOption = (e)=>{
        console.log(e.target.value);
        let filterText = e.target.value;
        let filterdOption = options.filter(item=>{
            return item.name.toLowerCase().includes(filterText.toLowerCase());
        })
        setSearch(filterText)
        setOption(filterdOption);
    }
    let clearSearch = ()=>{
        let filterText = "";
        let filterdOption = options.filter(item=>{
            return item.name.includes(filterText);
        })
        setSearch(filterText);
        setOption(filterdOption);
    }

    useEffect(() => {
        getValue(selectedOption)
    }, [selectedOption]);

    
    return (
        <CustomDropdownContainer className="customDropdown">
            <GlobalStyle />
            <DisplayTagContainer className="header" onClick={(e) => toggleSelectMethod(!toggleSelect)}>
                <BadgeWrapper>
                    <CreateBadge options={filteredOption} selected={selectedOption} removeBadge={removeBadge} />
                </BadgeWrapper>
                <DropDownArrow>
                {toggleSelect ? <img src='upArrow.png'/>:<img src='downArrow.png'/>}
                </DropDownArrow>
            </DisplayTagContainer>
            {toggleSelect &&
                <ListContainer>
                    <SearchContainer>
                    <Input 
                        type="text" 
                        className="searchItem" 
                        onChange={searchOption}
                        placeholder={searchPlaceholder} 
                        value={searchText}
                    />
                    {searchText.trim().length>0 && 
                    <CloseBtn theme="searchInput" onClick={clearSearch}>X</CloseBtn>}
                    </SearchContainer>
                    <ListUlWrapper>
                    <ListUl className="selectList">
                        {filteredOption.length > 0 && filteredOption.map((item, index) => {
                            let checked = selectedOption.indexOf(item.id) > -1;
                            return (<ListLi key={`${item.id}-${index}`}>
                                <label htmlFor={`${item.id}-${index}`}>
                                    <CheckBox
                                        type="checkbox"
                                        id={`${item.id}-${index}`}
                                        name={`${item.id}-${index}`}
                                        hiddenCheckBox={hiddenCheckBox}
                                        onChange={selectOption}
                                        value={item.id}
                                        checked={checked}
                                    />
                                    {item.name}
                                </label>
                            </ListLi>)
                        })}
                    </ListUl>
                    </ListUlWrapper>
                </ListContainer>
            }
        </CustomDropdownContainer>

    )
}

const CreateBadge = ({ options, selected, removeBadge }) => {
    let badgeArr = [];

    options.map((item, index) => {
        if (selected.indexOf(item.id) !== -1) {
            badgeArr.push(<Badge className="badgeItem" key={`${item.name}-${index}`}>{item.name}<CloseBtn onClick={(e) => { e.stopPropagation(); removeBadge(item.id) }}>X</CloseBtn></Badge>)
        }

    })
    return badgeArr
}