class Badge {
  constructor(readonly id: string) {}

  award() {}

  awarded(): boolean {
    return true;
  }
}

export default Badge;
