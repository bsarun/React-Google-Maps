import { PropTypes } from 'react';

const { bool, number, array, string, func, object, oneOf, oneOfType, shape } = PropTypes;

export const householdMemberShape = shape({
	firstName: string,
	lastName: string,
	age: number,
	headOfHousehold: oneOf(['Y', 'N']),
	personId: oneOfType([string, number]),
	totalAnnualIncome: number,
	projectedAnnualIncome: number,
	totalMonthlyIncome: number,
	domesticPartnerIndicator: oneOf(['Y', 'N']),
	incomes: array,
	deductions: array
});
export const applicationShape = shape({
	pendingAppId: oneOfType([string, number]),
	applicationId: null,
	agreeToConsent: bool,
	zipCode: string,
	hearExchangeCode: string,
	applicationDate: object,
	applicationSource: string,
	subsidizedApplication: string,
	documentId: string,
	applicationMode: string,
	applicationStatus: string
});

export const recordShape = shape({
	id: oneOfType([string, number]),
	incomeSource: string,
	amount: oneOfType([string, number]),
	amountMonthly: oneOfType([string, number]),
	incomeTypeCategory: string,
	incomeType: string,
	frequency: string,
	beginDate: string,
	endDate: oneOfType([string, object]),
	hoursPerWeek: number,
	daysPerWeek: number,
	sharedWithRDP: string
});

export const incomeValueShape = shape({
	amount: oneOfType([string, number]),
	frequency: string
});

export const categoryShape = shape({
	categoryType: string
});

export const incomeTypeShape = shape({
	incomeType: string
});

export const navItemShape = shape({
	active: bool,
	completed: bool,
	title: string,
	items: array,
	route: string
});

export const addressShape = shape({
	street1: string,
	street2: string,
	city: string,
	state: string,
	zip: string,
	countyCode: string,
	countyName: string
});

export const zipcodeCountiesShape = shape({
	countyCode: string,
	countyName: string
});
