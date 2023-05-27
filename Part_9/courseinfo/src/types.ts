export interface CoursePartBase {
	name: string;
	exerciseCount: number;
	description?: string;
	kind: "base"
}

export interface CoursePartGroup extends Omit<CoursePartBase, "kind"> {
	groupProjectCount: number;
	kind: "group";
}

export interface CoursePartBackground extends Omit<CoursePartBase, "kind"> {
	description: string;
	backgroundMaterial: string;
	kind: "background";
}

export interface CoursePartSpecial extends Omit<CoursePartBase, "kind"> {
	requirements: string[];
	kind: "special";
}

export type CoursePart = CoursePartBase | CoursePartGroup | CoursePartBackground | CoursePartSpecial
