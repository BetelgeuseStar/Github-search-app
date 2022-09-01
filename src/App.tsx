import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import FavouritesPage from './pages/FavouritesPage';
import FollowersPage from './pages/FollowersPage';
import FollowingPage from './pages/FollowingPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import './styles/App.scss';

function App() {
	return (
		<div className="app">
			<Navigation />
			<Routes>
				<Route path='/favourites' element={<FavouritesPage />} />
				<Route path='/profile/:login' element={<ProfilePage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/followers/:login/:total' element={<FollowersPage />} />
				<Route path='/following/:login/:total' element={<FollowingPage />} />
			</Routes>
		</div>
	);
}

export default App;
