const buf = Buffer.alloc(5); // გამოყავი buffer-ი ზომით 5 ბაიტი
console.log(buf)
buf[0] = 65; // მიანიჭე ASCII შიფრაციის მნიშნველობა (იგვეა რაც A)
buf[1] = 66; // მიანიჭე ASCII შიფრაციის მნიშვნელობა (იგივეა რაც B)
buf[2] = 67; // მიანიჭე ASCII შიფრაციის მნიშვნელობა (იგივეა რაც C)
console.log(buf)

const binaryData = Buffer.from([
    0x04a, 0x6f, 0x68, 0x06e,
    0x20, 0x04a, 0x6f, 0x68, 0x06e,

])

console.log(Buffer.from('J').toString('hex'))
// console.log(binaryData.toString());