def update_hour():
    tmp = hour
    if is_dst:
        tmp += 1
    else:
        tmp -= 1
is_dst = True
hour = int(input("Enter hour: "))
update_hour()