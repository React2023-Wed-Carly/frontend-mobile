import React, { useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import Card from './Card'; // Assuming that Card component is in the same directory
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatPrice } from '../utils/textFormatting';

export default function BookCarItem({ car, navigation }) {
	const distance = 5;
	return (
		<Card>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					flex: 1,
					marginVertical: -3,
				}}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image
						source={require(`../../assets/dummy_cars/car.png`)} // Assuming photo is a URL or local image path
						style={{
							width: 80,
							height: 80,
							borderRadius: 25,
							margin: -20,
							marginRight: 20,
							padding: 0,
						}}
					/>

					<View style={{ width: '70%' }}>
						<Text
							style={{ fontSize: 19, fontWeight: 'bold' }}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{car.brand} {car.model}
						</Text>

						<View
							style={{
								flexDirection: 'row',
								alignContent: 'center',
								padding: 2,
								paddingTop: 6,
								justifyContent: 'space-between',
								width: '70%',
							}}
						>
							<View style={{ flexDirection: 'row' }}>
								<Icon name="payments" color="gray" size={12} />
								<Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
									{`${formatPrice(car.dailyPrice)}`}/day
								</Text>
							</View>

							<View style={{ flexDirection: 'row' }}>
								<Icon
									name="airline-seat-recline-extra"
									color="gray"
									size={12}
								/>
								<Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
									{`${car.seatingCapacity}`}
								</Text>
							</View>
						</View>

						<View
							style={{
								flexDirection: 'row',
								alignContent: 'center',
								padding: 2,
							}}
						>
							<Icon name="location-pin" color="gray" size={12} />
							<Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
								{`${distance}`}km away
							</Text>
						</View>
					</View>
				</View>
			</View>
		</Card>
	);
}
