import { useAuth } from '@/hooks';
import { ChevronDown, LogOut, Menu, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
	{ name: 'Events', href: '/events' },
	{ name: 'Help Requests', href: '/help-requests' },
	{ name: 'Teams', href: '/teams' },
	{ name: 'Impact', href: '/impact' },
];

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, setUser } = useAuth();

	const handleLogout = () => {
		setUser(null);
	};

	return (
		<nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo and desktop navigation */}
					<div className="flex items-center">
						<Link to="/" className="flex-shrink-0 flex items-center">
							<span className="text-2xl font-bold text-primary">HandsOn</span>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							{navItems.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className="hover:text-primary font-medium"
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>

					{/* Desktop user menu */}
					<div className="hidden md:flex md:items-center md:space-x-4">
						{user ? (
							<UserMenu user={user} onLogout={handleLogout} />
						) : (
							<div className="flex items-center space-x-4">
								<Button asChild variant="outline">
									<Link to="/sign-in">Log in</Link>
								</Button>
								<Button asChild>
									<Link to="/sign-up">Sign up</Link>
								</Button>
							</div>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="flex md:hidden">
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Menu className="size-5" />
									<span className="sr-only">Open menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								side="left"
								className="h-screen overflow-auto w-[300px] sm:w-[350px]"
							>
								<SheetHeader>
									<SheetTitle className="text-left text-2xl font-bold text-primary">
										HandsOn
									</SheetTitle>
								</SheetHeader>
								<div className="flex flex-col gap-2">
									{navItems.map((item) => (
										<SheetClose asChild key={item.name}>
											<Link
												to={item.href}
												className="flex items-center p-2 text-base font-medium transition-colors hover:text-primary hover:bg-accent"
												onClick={() => setIsOpen(false)}
											>
												{item.name}
											</Link>
										</SheetClose>
									))}
								</div>
								<Separator />
								{user ? (
									<div className="space-y-4">
										<div className="p-2 flex items-center">
											<Avatar className="h-10 w-10 mr-3">
												<AvatarImage
													src={user.avatar || 'https://placehold.co/40'}
													alt={user.name}
												/>
												<AvatarFallback>{user.name?.[0]}</AvatarFallback>
											</Avatar>
											<div>
												<p className="text-sm font-medium">{user.name}</p>
												<p className="text-xs text-muted-foreground">
													{user.email}
												</p>
											</div>
										</div>
										<div className="p-2 flex flex-col space-y-2">
											<Button asChild variant="outline">
												<Link to="/profile" onClick={() => setIsOpen(false)}>
													Your Profile
												</Link>
											</Button>
											<Button variant="destructive" onClick={handleLogout}>
												Logout
											</Button>
										</div>
									</div>
								) : (
									<div className="flex flex-col space-y-4">
										<Button asChild variant="outline">
											<Link to="/sign-in" onClick={() => setIsOpen(false)}>
												Log in
											</Link>
										</Button>
										<Button asChild>
											<Link to="/sign-up" onClick={() => setIsOpen(false)}>
												Sign up
											</Link>
										</Button>
									</div>
								)}
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</nav>
	);
};

const UserMenu = ({ user, onLogout }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-10 w-full justify-start gap-2 px-2"
				>
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={user.avatar || 'https://placehold.co/40'}
							alt={user.name}
						/>
						<AvatarFallback>{user.name?.[0]}</AvatarFallback>
					</Avatar>
					<span className="ml-2 text-sm font-medium">{user.name}</span>
					<ChevronDown className="ml-auto h-4 w-4 opacity-50" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link to="/profile">
							<User className="mr-2 h-4 w-4" />
							Your Profile
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={onLogout}
					className="text-destructive focus:text-destructive"
				>
					<LogOut className="mr-2 h-4 w-4" />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Navbar;
