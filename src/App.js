import { useState, useEffect } from 'react'

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'
import './App.css'


const App = () => {
	const [searchField, setSearchField] = useState(''); // [value, setValue]
	const [title, setTitle] = useState('');
	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setFilterMonsters] = useState(monsters);

	console.log('render');

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => setMonsters(users));
	}, []);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((monster) => {
			return monster.name.toLocaleLowerCase().includes(searchField);
		});

		setFilterMonsters(newFilteredMonsters);

	}, [monsters, searchField]);

	const onSearchChange = event => {
		const searchFieldsString = event.target.value.toLocaleLowerCase()
		setSearchField(searchFieldsString)
	}

	const onTitleChange = event => {
		const searchFieldsString = event.target.value.toLocaleLowerCase()
		setTitle(searchFieldsString)
	}
console.log();
	return (
		<div className='App'>
			<h1 className='app-title'>{title}</h1>

			<SearchBox className='monsters-search-box' 
			onChangeHandler={onSearchChange} placeholder='search monsters' />
			<br />
			<SearchBox className='title-search-box' 
			onChangeHandler={onTitleChange} placeholder='set title' />

			<CardList monsters={filteredMonsters} />
		</div>
	)
}



// class App extends Component {
// 	constructor() {
// 		super()

// 		this.state = {
// 			monsters: [],
// 			searchField: '',
// 		}
// 	}

// 	componentDidMount() {
// 		fetch('https://jsonplaceholder.typicode.com/users')
// 			.then(response => response.json())
// 			.then(users =>
// 				this.setState(() => {
// 					return { monsters: users }
// 				})
// 			)
// 	}

// 	onSearchChange = event => {
// 		const searchField = event.target.value.toLocaleLowerCase()

// 		this.setState(() => {
// 			return { searchField }
// 		})
// 	}

// 	render() {
// 		const { monsters, searchField } = this.state
// 		const { onSearchChange } = this

// 		const filteredMonsters = monsters.filter(monster => {
// 			return monster.name.toLocaleLowerCase().includes(searchField)
// 		})

// 		return (
// 			<div className='App'>
// 				<h1 className='app-title'>Monsters Rolodex</h1>
// 				<SearchBox className='monsters-search-box' onChangeHandler={onSearchChange} placeholder='search monsters' />
// 				<CardList monsters={filteredMonsters} />
// 			</div>
// 		)
// 	}
// }

export default App
